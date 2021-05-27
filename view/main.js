document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("dragover",e=>{
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave","dragend"].forEach(type =>{
        dropZoneElement.addEventListener(type, e=>{
            dropZoneElement.classList.remove('drop-zone--over');
        });
    });

    dropZoneElement.addEventListener("drop",e=>{
        e.preventDefault();

        if(e.dataTransfer.files.length){
            inputElement.files=e.dataTransfer.files;
            updateThumbnail(dropZoneElement,e.dataTransfer.files[0]);
        }
        dropZoneElement.classList.remove('drop-zone--over');
    });
});

function send_upload(){

}
function updateThumbnail(dropZoneElement,file){
  let thumbnailElement=dropZoneElement.querySelector(".drop-zone__thumb");

  if(dropZoneElement.querySelector(".drop-zone__prompt")){
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  if(!thumbnailElement){
      thumbnailElement=document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label=file.name;

}

    function showTable(){
        let list = document.getElementById('result').contentDocument.firstChild.textContent;
        if(list) {
            let json = JSON.parse(list)

            let container = document.getElementById('container')
            container.innerHTML = ""

            let table = document.createElement('table')
            let tbody = document.createElement('tbody')
            if(json[0].time == "Invalid file, please input csv files!"){
                    let tr = document.createElement('tr')
                    let td = document.createElement('td')
                    td.textContent = json[0].time
                    tr.appendChild(td);
                    tbody.appendChild(tr)
                }
            else {
                let tr = document.createElement('tr')
                let td1 = document.createElement('td')
                td1.textContent = "Time"
                let td2 = document.createElement('td')
                td2.textContent = "Feature 1"
                let td3 = document.createElement('td')
                td3.textContent = "Feature 2"
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)

                tbody.appendChild(tr)
                if(json[0].time != ""){
                for (let i = 0; i < json.length; i++) {
                    let arr = [json[i].time, json[i].feature1, json[i].feature2]
                    let tr = document.createElement('tr')
                    for (let j = 0; j < arr.length; j++) {
                        let td = document.createElement('td')
                        td.textContent = arr[j]
                        tr.appendChild(td)
                    }
                    tbody.appendChild(tr)
                }
                }
            }
            table.appendChild(tbody)
            container.appendChild(table)
            table.setAttribute("border", "1")
            table.style.fontFamily = "Comic Sans MS"
            document.getElementById('result').style.visibility = 'hidden'

        }
}