
      var previewBox=document.querySelector(".previewBox");
      var saveColor=document.querySelector(".saveColor");
      var saveColorBox=document.querySelector(".saveColorBox");
      var rRange=document.querySelector("#rRange");
      var gRange=document.querySelector("#gRange");
      var bRange=document.querySelector("#bRange");
      var rValue=document.querySelector("#rValue");
      var gValue=document.querySelector("#gValue");
      var bValue=document.querySelector("#bValue");
      var rgbColorCode=document.querySelector("#rgbColorCode");
      var htmlColorCode=document.querySelector("#htmlColorCode");
      var hslColorCode=document.querySelector("#hslColorCode");
      var copyButton=document.querySelectorAll(".copyButton");
      var rCode, gCode, bCode;
      var getColor=localStorage.getItem("myColorCode");
      var colorArray=[];
      var body=document.querySelector("body");
      var alertBox=document.createElement("div");
      var alertBox2=document.createElement("div");
      alertBox.classList.add("alert");
      alertBox2.classList.add("alert2");
      //localStorage.removeItem("myColorCode");
      
      if(getColor){
        var colorValue=JSON.parse(getColor);
        colorValue.forEach(colorValue=>{
          colorArray.push(colorValue);
        })
      }
      console.log(colorArray)
      function ShowSavedColor(){
        saveColorBox.innerHTML="";
        colorArray.forEach((colorValue, id)=>{
          saveColorBox.innerHTML+=`
            <div class="savedColor">
              <div class="savedColorPreview" style="background: ${colorValue.html}"><div class="remove" onclick="RemoveSaveColor(${id})">Remove</div></div>
              <input value="${colorValue.html}" onclick="CopyCode(this)" readonly="true"/>
              <input value="${colorValue.rgb}" onclick="CopyCode(this)" readonly="true" />
              <input value="${colorValue.hsl}" onclick="CopyCode(this)" readonly="true" />
            </div>
          `;
        });
      }
      
      function MatchColor(){
        var find=colorArray.findIndex(GetColorCode);
        function GetColorCode(findColor){
          if(findColor.html === htmlColorCode.value){
           return findColor = findColor.html;
          }
        }
       if(find>=0){
         saveColor.innerText="Remove";
       } else {
         saveColor.innerText="Save";
       }
        
      }
      
      function RandomGenerate(){
        var r=Math.floor(Math.random()*255);
        var g=Math.floor(Math.random()*255);
        var b=Math.floor(Math.random()*255);
        rCode=r.toString(16).padStart(2, "0");
        gCode=g.toString(16).padStart(2, "0");
        bCode=b.toString(16).padStart(2, "0");
        rValue.value=r;
        gValue.value=g;
        bValue.value=b;
        rRange.value=r;
        gRange.value=g;
        bRange.value=b;
        
        previewBox.style.background=`rgb(${rValue.value}, ${gValue.value}, ${bValue.value})`;
        ShowValue(r, g, b);
        MatchColor();
      }
      
      function UserGenerateColor(target){
        switch(target.id){
          case "rRange":
            rValue.value=target.value;
            rCode=(parseInt(target.value)).toString(16).padStart(2, "0");
            break;
          case "gRange":
            gValue.value=target.value;
            gCode=(parseInt(target.value)).toString(16).padStart(2, "0");
            break;
          case "bRange":
            bValue.value=target.value;
            bCode=(parseInt(target.value)).toString(16).padStart(2, "0");
            break;
        }
        previewBox.style.background=`rgb(${rValue.value}, ${gValue.value}, ${bValue.value})`;
        ShowValue(parseInt(rValue.value), parseInt(gValue.value), parseInt(bValue.value));
        MatchColor();
      }
      
      function RgbToHsl(r,g,b){
    var r1 = r / 255;
    var g1 = g / 255;
    var b1 = b / 255;
    var maxColor = Math.max(r1,g1,b1);
    var minColor = Math.min(r1,g1,b1);
    //Calculate L:
    var L = (maxColor + minColor) / 2 ;
    var S = 0;
    var H = 0;
    if(maxColor != minColor){
        //Calculate S:
        if(L < 0.5){
            S = (maxColor - minColor) / (maxColor + minColor);
        }else{
            S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        }
        //Calculate H:
        if(r1 == maxColor){
            H = (g1-b1) / (maxColor - minColor);
        }else if(g1 == maxColor){
            H = 2.0 + (b1 - r1) / (maxColor - minColor);
        }else{
            H = 4.0 + (r1 - g1) / (maxColor - minColor);
        }
    }
    L = L * 100;
    S = S * 100;
    H = H * 60;
    if(H<0){
        H += 360;
    }
    hslColorCode.value=`hsl(${Math.round(H)}, ${Math.round(S)}%, ${Math.round(L)}%)`;
}
      
      function ShowValue(r, g, b){
        RgbToHsl(r,g,b);
        htmlColorCode.value=`#${rCode}${gCode}${bCode}`;
        rgbColorCode.value=`rgb(${r}, ${g}, ${b})`;
      }
      
      copyButton.forEach(copyButton=>{
        copyButton.onclick=()=>{
          var myColorCode=copyButton.parentElement.parentElement.querySelector("input");
          var copyBox=document.createElement("input");
          copyBox.classList.add("copyBox");
          copyBox.setAttribute("readonly", "true");
          copyBox.value=myColorCode.value;
          previewBox.appendChild(copyBox);
          copyBox.select();
          document.execCommand("copy");
          alertBox.innerHTML=`${myColorCode.value}<br />Code copied.`;
          body.appendChild(alertBox);
          setTimeout(()=>{
            previewBox.removeChild(copyBox);
            body.removeChild(alertBox)
          }, 500)
        }
      })
      
      function CopyCode(id){
        var copyBox=document.createElement("input");
        var savedColorPreview=id.parentElement.querySelector(".savedColorPreview");
        copyBox.classList.add("copyBox");
          copyBox.setAttribute("readonly", "true");
          copyBox.value=id.value;
          previewBox.appendChild(copyBox);
          copyBox.select();
          document.execCommand("copy");
          alertBox2.innerHTML=`${id.value}<br />Code copied.`;
          savedColorPreview.appendChild(alertBox2);
          setTimeout(()=>{
            //previewBox.removeChild(copyBox);
            //savedColorPreview.removeChild(alertBox2);
          }, 500)
      }
      
      function RemoveSaveColor(id){
        colorArray.splice(id, 1);
        localStorage.setItem("myColorCode", JSON.stringify(colorArray));
        ShowSavedColor();
        saveColor.innerText="Save";
        alertBox.innerText="Code Removed.";
        body.appendChild(alertBox);
        setTimeout(()=>{
         body.removeChild(alertBox);
       }, 500)
      }
      
      RandomGenerate();
      ShowSavedColor();
      function UserGenerate(e){
        UserGenerateColor(e);
      }
      saveColor.addEventListener("click", e=>{
       var find=colorArray.findIndex(GetColorCode);
       function GetColorCode(findColor){
          if(findColor.html === htmlColorCode.value){
           return findColor = findColor.html;
          }
        }
       if(find>=0){
         colorArray.splice(find, 1);
         localStorage.setItem("myColorCode", JSON.stringify(colorArray));
         saveColor.innerText="Save";
         alertBox.innerText="Code Removed.";
         body.appendChild(alertBox);
       } else {
         saveColor.innerText="Remove";
         alertBox.innerText="Code Saved.";
         body.appendChild(alertBox);
         var fakePath={html: htmlColorCode.value, rgb: rgbColorCode.value, hsl:hslColorCode.value}
         colorArray.unshift(fakePath);
         localStorage.setItem("myColorCode", JSON.stringify(colorArray));
       }
       setTimeout(()=>{
         body.removeChild(alertBox);
       }, 500)
       ShowSavedColor();
      });