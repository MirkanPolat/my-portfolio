import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, NgZone } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'scroll-reveal');

    // iOS Safari: auf Touch-Devices IO komplett überspringen — alle Elemente sofort sichtbar
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      this.renderer.addClass(this.el.nativeElement, 'revealed');
      return;
    }

    this.renderer.addClass(this.el.nativeElement, 'before-reveal');

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.renderer.removeClass(this.el.nativeElement, 'before-reveal');
              this.renderer.addClass(this.el.nativeElement, 'revealed');
              this.observer.unobserve(this.el.nativeElement);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px'
        }
      );

      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
