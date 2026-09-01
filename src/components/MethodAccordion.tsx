import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MethodAccordion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const section = root.querySelector('[data-effect="method-scroll-accordion"]') as HTMLElement;
    if (!section) return;

    const wrapper = section.querySelector('.method-wrapper') as HTMLElement;
    const title = section.querySelector('.method-title') as HTMLElement;
    const progressFill = section.querySelector('.method-progress-fill') as HTMLElement;
    const glow = section.querySelector('.method-glow') as HTMLElement;
    const items = Array.from(section.querySelectorAll('.method-item')) as HTMLElement[];

    if (!wrapper || !items.length) return;

    let tl: gsap.core.Timeline;
    let st: ScrollTrigger;
    let resizeTimer: gsap.core.Tween;

    function setup() {
      if (tl) tl.kill();
      if (st) st.kill();

      // Reset items and measure bodies
      items.forEach((item) => {
        const body = item.querySelector('.method-body') as HTMLElement;
        const bgGrad = item.querySelector('.method-background-gradient') as HTMLElement;
        const bgWhite = item.querySelector('.method-background-white') as HTMLElement;
        const quote = item.querySelector('.method-quote') as HTMLElement;
        const sig = item.querySelector('.method-signature') as HTMLElement;
        const logo = item.querySelector('.method-logo') as HTMLElement;

        if (body) {
          body.style.height = 'auto';
          const h = body.scrollHeight;
          body.style.height = '0px';
          (item as any)._measuredHeight = h;
        }

        gsap.set(bgGrad, { opacity: 0, yPercent: 20, scale: 1 });
        gsap.set(bgWhite, { opacity: 0 });
        if (quote) gsap.set(quote, { y: 28, opacity: 0 });
        if (sig) gsap.set(sig, { y: '100%', opacity: 0 });
        if (logo) logo.classList.remove('is-active');
      });

      tl = gsap.timeline({ paused: true });

      const n = items.length;
      const openDuration = 0.4;
      const holdDuration = 0.6;
      const closeDuration = 0.4;

      items.forEach((item, index) => {
        const body = item.querySelector('.method-body') as HTMLElement;
        const bgGrad = item.querySelector('.method-background-gradient') as HTMLElement;
        const bgWhite = item.querySelector('.method-background-white') as HTMLElement;
        const quote = item.querySelector('.method-quote') as HTMLElement;
        const sig = item.querySelector('.method-signature') as HTMLElement;
        const logo = item.querySelector('.method-logo') as HTMLElement;
        const measuredH = (item as any)._measuredHeight || 120;

        const startTime = index * (openDuration + holdDuration);

        // Open
        tl.to(
          body,
          {
            height: measuredH,
            duration: openDuration,
            ease: 'linear',
            immediateRender: false,
          },
          startTime
        );

        tl.to(
          bgGrad,
          {
            opacity: 1,
            yPercent: -60,
            scale: 1.3,
            duration: openDuration,
            ease: 'power1.out',
            immediateRender: false,
          },
          startTime
        );

        tl.to(
          bgWhite,
          {
            opacity: 0.7,
            duration: openDuration * 0.5,
            ease: 'power1.out',
            immediateRender: false,
          },
          startTime + openDuration * 0.5
        );

        if (quote) {
          tl.to(
            quote,
            {
              y: 0,
              opacity: 1,
              duration: openDuration * 0.8,
              ease: 'power2.out',
              immediateRender: false,
            },
            startTime + openDuration * 0.2
          );
        }

        if (sig) {
          tl.to(
            sig,
            {
              y: '0%',
              opacity: 1,
              duration: openDuration * 0.8,
              ease: 'power2.out',
              immediateRender: false,
            },
            startTime + openDuration * 0.3
          );
        }

        if (logo) {
          tl.call(() => logo.classList.add('is-active'), [], startTime);
        }

        // Hold & Close
        const closeStartTime = startTime + openDuration + holdDuration;
        const isLast = index === n - 1;

        if (!isLast) {
          tl.to(
            body,
            {
              height: 0,
              duration: closeDuration,
              ease: 'linear',
              immediateRender: false,
            },
            closeStartTime
          );

          tl.to(
            bgGrad,
            {
              opacity: 0,
              yPercent: -100,
              duration: closeDuration,
              ease: 'power1.in',
              immediateRender: false,
            },
            closeStartTime
          );

          tl.to(
            bgWhite,
            {
              opacity: 0,
              duration: closeDuration * 0.5,
              ease: 'power1.in',
              immediateRender: false,
            },
            closeStartTime
          );

          if (quote) {
            tl.to(
              quote,
              {
                y: -10,
                opacity: 0,
                duration: closeDuration * 0.5,
                ease: 'power1.in',
                immediateRender: false,
              },
              closeStartTime
            );
          }

          if (sig) {
            tl.to(
              sig,
              {
                y: '-50%',
                opacity: 0,
                duration: closeDuration * 0.5,
                ease: 'power1.in',
                immediateRender: false,
              },
              closeStartTime
            );
          }

          if (logo) {
            tl.call(() => logo.classList.remove('is-active'), [], closeStartTime + closeDuration);
          }
        } else {
          // Last item hold
          tl.to({}, { duration: 0.3 }, closeStartTime);
        }
      });

      const totalDuration = tl.duration();

      st = ScrollTrigger.create({
        id: 'method-scroll-accordion',
        trigger: section,
        start: 'top top',
        end: () => '+=' + window.innerHeight * n,
        pin: wrapper,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Title translation on desktop
          if (title && !window.matchMedia('(max-width: 768px)').matches) {
            const yVal = gsap.utils.interpolate(50, -50, p);
            title.style.transform = `translate3d(0, ${yVal}%, 0)`;
          } else if (title) {
            title.style.transform = 'none';
          }

          // Progress fill
          if (progressFill) {
            progressFill.style.transform = `scaleX(${p})`;
          }

          // Glow animation
          if (glow) {
            const glowY = gsap.utils.interpolate(-12, 16, p);
            const glowScale = gsap.utils.interpolate(0.8, 1.2, p);
            const glowOp = gsap.utils.interpolate(0.55, 1, p);
            glow.style.transform = `translate3d(-50%, calc(-50% + ${glowY}vh), 0) scale(${glowScale})`;
            glow.style.opacity = `${glowOp}`;
          }

          // Timeline scrub
          const targetTime = gsap.utils.interpolate(0.05, 1, p) * totalDuration;
          tl.seek(targetTime);
        },
      });
    }

    setup();

    const handleResize = () => {
      if (resizeTimer) resizeTimer.kill();
      resizeTimer = gsap.delayedCall(0.15, setup);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (st) st.kill();
      if (tl) tl.kill();
      if (resizeTimer) resizeTimer.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="method-accordion-container">
      <style>{`
        :root {
          --vr: clamp(0.7px, 0.06945vw, 1px);
          --color-black: #080808;
          --color-white: #f8f8f8;
          --color-light-blue: #cfd9e0;
          --color-black-2: #1c1c1c;
          color-scheme: dark;
        }

        .method-accordion-container {
          background: var(--color-black);
          color: var(--color-light-blue);
          font-family: Arial, Helvetica, sans-serif;
          overflow-x: hidden;
        }

        .preview-spacer {
          min-height: 80vh;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 4rem 2rem;
          color: rgba(207, 217, 224, 0.55);
          font-family: "Courier New", monospace;
          font-size: 0.75rem;
          line-height: 1.4;
          text-transform: uppercase;
          letter-spacing: 0;
          background: var(--color-black);
        }

        .preview-spacer.bottom {
          min-height: 70vh;
          align-items: flex-start;
        }

        [data-effect="method-scroll-accordion"] {
          min-height: 100vh;
          position: relative;
          background: var(--color-black);
          overflow: hidden;
          z-index: 1;
        }

        .method-wrapper {
          position: relative;
          top: 0;
          height: 100vh;
          display: flex;
          overflow: hidden;
          isolation: isolate;
          background: var(--color-black);
        }

        .method-background-wrapper {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: var(--color-black);
          pointer-events: none;
        }

        .method-glow {
          position: absolute;
          left: 50%;
          top: 22%;
          width: min(96vw, 1040px);
          aspect-ratio: 1;
          transform: translate3d(-50%, -50%, 0) scale(1);
          border-radius: 999px;
          opacity: 0.95;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 1) 0 7%, rgba(84, 203, 255, 0.88) 12%, rgba(6, 115, 165, 0.72) 26%, rgba(6, 87, 125, 0.35) 44%, rgba(8, 8, 8, 0) 68%);
          filter: blur(2px);
          will-change: transform, opacity;
        }

        .method-progress {
          position: absolute;
          top: calc(70 * var(--vr));
          left: calc(20 * var(--vr));
          width: calc(100% - calc(20 * var(--vr)) * 2);
          height: 2px;
          transform-origin: left;
          transform: scaleX(0.5);
          background: rgba(255, 255, 255, 0.15);
          z-index: 3;
        }

        .method-progress-fill {
          height: 100%;
          background: var(--color-white);
          opacity: 0.4;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.1s ease;
        }

        .method-left {
          flex: 1;
          display: flex;
          align-items: center;
          margin-left: calc(20 * var(--vr));
          color: var(--color-light-blue);
          z-index: 2;
          pointer-events: none;
        }

        .method-title {
          max-width: calc(380 * var(--vr));
          margin: 0;
          font-size: calc(48 * var(--vr));
          line-height: 0.98;
          font-weight: 400;
          letter-spacing: calc(-0.48 * var(--vr));
          transform: translate3d(0, 50%, 0);
          will-change: transform;
        }

        .method-right {
          width: min(calc((98 * var(--vr) + 20 * var(--vr)) * 4), 34vw);
          min-width: 360px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-right: calc(20 * var(--vr));
          z-index: 2;
        }

        .method-kicker {
          color: var(--color-light-blue);
          margin-bottom: calc(46 * var(--vr));
          display: flex;
          align-items: flex-start;
          gap: calc(4 * var(--vr));
          font-size: calc(14 * var(--vr));
          line-height: 1;
        }

        .method-kicker p {
          margin: 0;
        }

        .method-item {
          flex-shrink: 0;
          border-radius: calc(13 * var(--vr));
          overflow: hidden;
          position: relative;
          padding: calc(20 * var(--vr));
          margin-bottom: calc(10 * var(--vr));
          min-height: calc(64 * var(--vr));
        }

        .method-background,
        .method-background-inner,
        .method-background-gradient,
        .method-background-white,
        .method-background-blur {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }

        .method-background {
          z-index: 0;
        }

        .method-background-inner {
          z-index: 0;
          transform-origin: top;
          overflow: hidden;
          border-radius: calc(13 * var(--vr));
        }

        .method-background-gradient {
          height: 300%;
          opacity: 0;
          transform: translate3d(0, 20%, 0) scale(1);
          background: radial-gradient(ellipse 150% 70% at 50% 80%, white 0, white 20%, transparent 50%, white 80%, white 100%);
          will-change: opacity, transform;
        }

        .method-background-white {
          background: #fff;
          opacity: 0;
          z-index: 1;
          will-change: opacity;
        }

        .method-background-blur {
          z-index: 0;
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(38px);
          opacity: 1;
        }

        .method-button {
          position: relative;
          z-index: 1;
          min-height: calc(24 * var(--vr));
          display: flex;
          align-items: center;
          cursor: default;
          background: transparent;
          border: 0;
          padding: 0;
        }

        .method-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          max-height: calc(23 * var(--vr));
          max-width: calc(140 * var(--vr));
          min-width: calc(78 * var(--vr));
          width: auto;
          height: calc(23 * var(--vr));
          color: var(--color-light-blue);
          transition: color 0.3s ease;
          font-family: "Courier New", monospace;
          font-size: calc(11 * var(--vr));
          line-height: 1;
          letter-spacing: calc(0.22 * var(--vr));
          text-transform: uppercase;
          font-weight: 700;
          will-change: filter;
        }

        .method-logo.is-active {
          color: #080808 !important;
        }

        .method-body {
          height: 0;
          overflow: hidden;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          color: var(--color-black-2);
        }

        .method-body-content {
          padding-top: calc(75 * var(--vr));
        }

        .method-quote {
          margin: 0;
          font-size: calc(14 * var(--vr));
          line-height: calc(21 * var(--vr));
          letter-spacing: calc(0.2 * var(--vr));
          transform: translateY(28px);
          opacity: 0;
          will-change: transform, opacity;
        }

        .method-signature {
          margin: calc(28 * var(--vr)) 0 0;
          display: inline-block;
          padding: calc(4 * var(--vr)) calc(4 * var(--vr)) calc(5 * var(--vr));
          border-radius: calc(4 * var(--vr));
          background: #ececec;
          color: #080808;
          font-family: "Courier New", monospace;
          font-size: calc(11 * var(--vr));
          line-height: 1.1;
          letter-spacing: calc(0.22 * var(--vr));
          text-transform: uppercase;
          transform: translateY(100%);
          opacity: 0;
          will-change: transform, opacity;
        }

        @media (max-width: 768px) {
          :root {
            --vr: clamp(0.78px, 0.254vw, 1px);
          }
          .method-wrapper {
            flex-direction: column;
            justify-content: flex-start;
            padding: clamp(48px, 10svh, 72px) calc(20 * var(--vr)) calc(24 * var(--vr));
            gap: calc(22 * var(--vr));
          }
          .method-progress {
            top: calc(24 * var(--vr));
            left: calc(20 * var(--vr));
            width: calc(100% - calc(20 * var(--vr)) * 2);
          }
          .method-left {
            position: relative;
            top: auto;
            flex: unset;
            width: 100%;
            max-width: min(100%, 360px);
            margin-left: 0;
            transform: none;
          }
          .method-title {
            max-width: 100%;
            font-size: clamp(30px, 8.9vw, 35px);
            line-height: 1.04;
            letter-spacing: 0;
            transform: none !important;
          }
          .method-right {
            width: 100%;
            min-width: 0;
            margin: 0;
            justify-content: flex-start;
          }
          .method-kicker {
            margin-bottom: calc(12 * var(--vr));
            transform: none;
          }
          .method-background-blur {
            backdrop-filter: unset;
          }
          .method-body-content {
            padding-top: calc(28 * var(--vr));
          }
          .method-quote {
            line-height: calc(17 * var(--vr));
          }
        }
      `}</style>

      <div className="preview-spacer">
        <span>Role a página para avançar o método de atendimento</span>
      </div>

      <section data-effect="method-scroll-accordion" aria-label="Etapas do metodo">
        <div className="method-background-wrapper">
          <div className="method-glow"></div>
        </div>

        <div className="method-progress">
          <div className="method-progress-fill"></div>
        </div>

        <div className="method-wrapper">
          <div className="method-left">
            <h3 className="method-title">Do pão fresquinho ao churrasco: tudo o que você precisa na Praia do Francês.</h3>
          </div>

          <div className="method-right">
            <div className="method-kicker">
              <p>Etapas do processo</p>
              <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor" style={{ width: 'calc(11 * var(--vr))', marginTop: 'calc(1 * var(--vr))', transform: 'rotate(90deg)' }}>
                <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            <article className="method-item" aria-label="Etapa 01 - Padaria Fresca">
              <div className="method-background">
                <div className="method-background-inner">
                  <div className="method-background-gradient"></div>
                  <div className="method-background-white"></div>
                  <div className="method-background-blur"></div>
                </div>
              </div>
              <button className="method-button" aria-expanded="false">
                <span className="method-logo">01. Padaria</span>
              </button>
              <div className="method-body">
                <div className="method-body-content">
                  <img 
                    src="https://res.cloudinary.com/vje6jqtb/image/upload/v1788219299/WhatsApp_Image_2026-08-31_at_7.28.19_PM.jpg" 
                    alt="Padaria Fresca" 
                    className="w-full h-36 object-cover rounded-xl mb-3 shadow-md"
                  />
                  <p className="method-quote">
                    Pães quentinhos assados várias vezes ao dia, bolos caseiros fresquinhos, pão de alho e delícias de padaria para começar sua manhã perfeitamente na Praia do Francês.
                  </p>
                  <p className="method-signature">Sempre fresquinho</p>
                </div>
              </div>
            </article>

            <article className="method-item" aria-label="Etapa 02 - Gelados & Bebidas">
              <div className="method-background">
                <div className="method-background-inner">
                  <div className="method-background-gradient"></div>
                  <div className="method-background-white"></div>
                  <div className="method-background-blur"></div>
                </div>
              </div>
              <button className="method-button" aria-expanded="false">
                <span className="method-logo">02. Gelados</span>
              </button>
              <div className="method-body">
                <div className="method-body-content">
                  <img 
                    src="https://res.cloudinary.com/vje6jqtb/image/upload/v1788219300/WhatsApp_Image_2026-08-31_at_7.28.15_PM.jpg" 
                    alt="Gelados e Bebidas" 
                    className="w-full h-36 object-cover rounded-xl mb-3 shadow-md"
                  />
                  <p className="method-quote">
                    Bebidas ultrageladas, cervejas 600ml, açaí reforçado, água de coco fresca e sucos naturais para espantar o calor da praia com máxima praticidade.
                  </p>
                  <p className="method-signature">Geladinho garantido</p>
                </div>
              </div>
            </article>

            <article className="method-item" aria-label="Etapa 03 - Churrasco & Frios">
              <div className="method-background">
                <div className="method-background-inner">
                  <div className="method-background-gradient"></div>
                  <div className="method-background-white"></div>
                  <div className="method-background-blur"></div>
                </div>
              </div>
              <button className="method-button" aria-expanded="false">
                <span className="method-logo">03. Churrasco</span>
              </button>
              <div className="method-body">
                <div className="method-body-content">
                  <img 
                    src="https://res.cloudinary.com/vje6jqtb/image/upload/v1788219300/WhatsApp_Image_2026-08-31_at_7.28.18_PM.jpg" 
                    alt="Churrasco e Frios" 
                    className="w-full h-36 object-cover rounded-xl mb-3 shadow-md"
                  />
                  <p className="method-quote">
                    Tudo para seu churrasco de fim de semana ou reunião com amigos: carvão, queijo coalho artesanal, carnes selecionadas e frios fatiados na hora.
                  </p>
                  <p className="method-signature">Pronto pro churras</p>
                </div>
              </div>
            </article>

            <article className="method-item" aria-label="Etapa 04 - Delivery Rápido">
              <div className="method-background">
                <div className="method-background-inner">
                  <div className="method-background-gradient"></div>
                  <div className="method-background-white"></div>
                  <div className="method-background-blur"></div>
                </div>
              </div>
              <button className="method-button" aria-expanded="false">
                <span className="method-logo">04. Delivery</span>
              </button>
              <div className="method-body">
                <div className="method-body-content">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 rounded-full border-2 border-slate-900 overflow-hidden shadow-md">
                      <img 
                        src="https://res.cloudinary.com/vje6jqtb/image/upload/v1788219297/WhatsApp_Image_2026-08-31_at_8.29.22_PM.jpg" 
                        alt="Delivery Logo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <p className="method-quote">
                    Monte sua cesta virtual pelo site e envie direto para o nosso WhatsApp. Entregamos rapidamente na sua casa ou pousada na Praia do Francês com total comodidade!
                  </p>
                  <p className="method-signature">Entrega ágil</p>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      <div className="preview-spacer bottom">
        <span>Fim da visualização</span>
      </div>
    </div>
  );
}
