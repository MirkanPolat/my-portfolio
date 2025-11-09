import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'scroll-reveal');
    this.renderer.addClass(this.el.nativeElement, 'before-reveal');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.removeClass(this.el.nativeElement, 'before-reveal');
            this.renderer.addClass(this.el.nativeElement, 'revealed');
          } else {
            this.renderer.removeClass(this.el.nativeElement, 'revealed');
            this.renderer.addClass(this.el.nativeElement, 'before-reveal');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px'
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
