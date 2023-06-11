document.addEventListener( "DOMContentLoaded",() => {
    new Glide(".glide", {
        type: "carousel",
        startAt: 0,
        animationTimingFunc: "cubic-bezier(.17,.27,.23,.1)",
        gap: 100,
        perView: 3,
        animationDuration: 150
    }).mount(); 

    let prevBtn = document.getElementById("prev")
    let nextBtn = document.getElementById("next")

    let background = document.querySelector(".background")
    let indices = document.querySelectorAll(".index")
    let bgImg = ["burj.webp", "Cayan-tower.jpeg", "burj-al-arab.jpeg", "IMG_6303.jpeg"]
    let currentIndex = 0
    
    indices.forEach(index => index.classList.remove("active"));
    indices[currentIndex].classList.add("active")

    let myAnimation = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        imagesRatio: 1080 / 1920,
        image1: `img/${bgImg[0]}`,
        image2: `img/${bgImg[1]}`,
        displacementImage: "img/1.jpeg",
        hover: false
    });
    let myAnimation2 = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        imagesRatio: 1080 / 1920,
        image1: `img/${bgImg[1]}`,
        image2: `img/${bgImg[2]}`,
        displacementImage: "img/1.jpeg",
        hover: false
    });
    let myAnimation3 = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        imagesRatio: 1080 / 1920,
        image1: `img/${bgImg[2]}`,
        image2: `img/${bgImg[3]}`,
        displacementImage: "img/1.jpeg",
        hover: false
    });
    let myAnimation4 = new hoverEffect({
        parent: document.querySelector(".background"),
        intensity: 0.3,
        imagesRatio: 1080 / 1920,
        image1: `img/${bgImg[3]}`,
        image2: `img/${bgImg[0]}`,
        displacementImage: "img/1.jpeg",
        hover: false
    });

    let distortAnimations = [
        myAnimation,
        myAnimation2,
        myAnimation3,
        myAnimation4
      ];
    
      function startNextDistortAnimation() {
        let prevIndex = currentIndex;
        currentIndex = (currentIndex + 1) % 4;
        indices.forEach(index => index.classList.remove("active"));
        indices[currentIndex].classList.add("active");
        distortAnimations[prevIndex].next();
        showTextAnimation("next");
        setTimeout(() => {
          let canvas = background.querySelectorAll("canvas");
          background.appendChild(canvas[0]);
          distortAnimations[prevIndex].previous();
        }, 1200);
      }
    
      function startPrevDistortAnimation() {
        currentIndex = currentIndex - 1 < 0 ? 3 : currentIndex - 1;
        indices.forEach(index => index.classList.remove("active"));
        indices[currentIndex].classList.add("active");
        distortAnimations[currentIndex].next();
        showTextAnimation("prev");
        setTimeout(() => {
          let canvas = background.querySelectorAll("canvas");
          background.insertBefore(canvas[canvas.length - 1], background.firstChild);
          distortAnimations[currentIndex].previous();
        }, 500);
      }
    
      nextBtn.addEventListener("click", () => {
        startNextDistortAnimation();
      });
    
      prevBtn.addEventListener("click", () => {
        startPrevDistortAnimation();
      });
    
      let titleDisplacement = 0;
      let descriptionDisplacement = 0;
    
      function showTextAnimation(direction) {
        if (titleDisplacement === 0 && direction === "prev") {
          titleDisplacement = -420;
        } else if (titleDisplacement === -420 && direction === "next") {
          titleDisplacement = 0;
        } else {
          titleDisplacement =
            direction === "next"
              ? titleDisplacement - 140
              : titleDisplacement + 140;
        }
    
        if (descriptionDisplacement === 0 && direction === "prev") {
          descriptionDisplacement = -150;
        } 
        else if(descriptionDisplacement === -150 && direction === "next"){
          descriptionDisplacement = 0;
        }
        else {
          descriptionDisplacement =
            direction === "next" 
              ? descriptionDisplacement - 50
              : descriptionDisplacement + 50;
        }
    
        let title = document.querySelectorAll("#title h4");
        let description = document.querySelectorAll("#description p");
    
        title.forEach(title => {
          TweenMax.to(title, 1, {
            top: `${titleDisplacement}px`,
            ease: Strong.easeInOut
          });
        });
    
        description.forEach((description, index) => {
          let opacity = 0;
          if(index === currentIndex){
            opacity = 1;
          }else {
            opacity = 0;
          }
          TweenMax.to(description, 1, {
            top: `${descriptionDisplacement}px`,
            ease: Strong.easeInOut,
            opacity: opacity
          });
        })
      }
    });