
async function getImgs(){
    try{
  
      var jsonData=await fetch('../data.json')
      
      let data=await jsonData.json();
      
      let imgs =data.map(function(item) {
        return item.slider;
       });
       setImgsArray(imgs);
       startInterval()
     }
     catch{
       console.log("Data not found");
     }
  }
  
  let imgsArr=[];
  getImgs();
  
  let setImgsArray= (imgs)=>{
  imgsArr.push(...imgs)
  return true;
  }
  
  //   ==================== Update slider ============
  
  var prevButton = document.getElementById('prevButton');
  var nextButton = document.getElementById('nextButton');
  var currentIndex = 0;
  var sliderInterval;
  
  
  
  
   function updateSlider() {
      
    var slider = document.getElementById('slider');
    slider.style.backgroundImage = 'url(' + imgsArr[currentIndex] + ')';
   }
   
  function startInterval() {
      sliderInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % imgsArr.length;
            updateSlider();
          }, 1200);
          
        }
      
      function resetInterval() {
          clearInterval(sliderInterval);
          startInterval();
      }
  //   ===================Previous & Next Btns===================
  prevButton.addEventListener('click', function() {
    
    currentIndex = (currentIndex - 1 + imgsArr.length) % imgsArr.length;
    updateSlider();
    resetInterval();
  });
  
  nextButton.addEventListener('click', function() {
    
     currentIndex = (currentIndex + 1) % imgsArr.length;
      updateSlider();
      resetInterval();
    });
  