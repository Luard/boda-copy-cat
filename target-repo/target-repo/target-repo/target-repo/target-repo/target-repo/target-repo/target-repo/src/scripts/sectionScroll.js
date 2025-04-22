document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  const isMobile = window.innerWidth <= 768;
  let touchStartY = 0;
  let touchEndY = 0;
  let isScrolling = false;
  let currentSectionIndex = 0;
  
  // Inicializar el índice de sección actual basado en la posición de scroll
  function updateCurrentSectionIndex() {
    const scrollPosition = window.scrollY + (window.innerHeight / 4);
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSectionIndex = i;
        break;
      }
    }
  }
  
  // Llamar inicialmente para establecer la sección actual
  updateCurrentSectionIndex();
  
  // Función para desplazarse a una sección específica
  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      isScrolling = true;
      
      // Desplazarse a la sección
      window.scrollTo({
        top: sections[index].offsetTop,
        behavior: 'smooth'
      });
      
      // Actualizar el índice actual
      currentSectionIndex = index;
      
      // Desbloquear después de la animación
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    }
  }
  
  // Eventos táctiles para móviles
  if (isMobile) {
    document.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
      if (isScrolling) return;
      
      touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchStartY - touchEndY;
      
      // Si el deslizamiento es significativo (más de 50px)
      if (Math.abs(touchDiff) > 50) {
        // Determinar dirección
        const direction = touchDiff > 0 ? 1 : -1;
        const nextIndex = currentSectionIndex + direction;
        
        // Desplazarse a la siguiente sección si existe
        if (nextIndex >= 0 && nextIndex < sections.length) {
          e.preventDefault();
          scrollToSection(nextIndex);
        }
      }
    }, { passive: false });
  }
  
  // Actualizar el índice de sección actual durante el desplazamiento normal
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      updateCurrentSectionIndex();
    }
  }, { passive: true });
  
  // Actualizar cuando cambia el tamaño de la ventana
  window.addEventListener('resize', function() {
    const wasMobile = isMobile;
    const newIsMobile = window.innerWidth <= 768;
    
    // Si cambia el estado de móvil, recargar la página
    if (wasMobile !== newIsMobile) {
      window.location.reload();
    }
  });
});