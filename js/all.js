let btn = document.querySelector('.btn');
let btn2 = document.querySelector('.btn2');
let BMI = document.querySelector('.BMI');
let img = document.querySelector('.img');
let list = document.querySelector('.list');
let heightCheck = document.querySelector('.heightCheck');
let weightCheck = document.querySelector('.weightCheck');
let data = JSON.parse(localStorage.getItem('listData')) || [];

init(data);//更新畫面



//檢查輸入值
btn.addEventListener('click',function(){
    let height = document.querySelector('.height').value;
    let weight = document.querySelector('.weight').value;
    
    
    if( height ==="" || height >= 300 || height <= 10 ){
        heightCheck.textContent="請輸入有效數字！！";
        empty();
        //alert('請輸入正確的身高數值！');
        return;
    }else{
        heightCheck.textContent=""
    }
    if( weight ==="" || weight >= 300 || weight <= 10 ){
        weightCheck.textContent="請輸入有效數字！！"
        empty();
        //alert('請輸入正確的體重數值！');
        return;
    }else{
        weightCheck.textContent=""
    }
    let bmi = (weight / ((height/100)**2)).toFixed(1);
    BMI.textContent = bmi;//置換內容為BMI結果 
    
    toggle();  //切換d-none用

    let obj ={};
    obj.height = height;
    obj.weight = weight;
    
    let color;
    obj.BMI = bmi;
    obj.statu = checkBMI(bmi);

    switch(checkBMI(bmi)){
        case "過輕":
            color = 'underweightcolor';
            break;
        case "理想":
            color = 'normalcolor';
            break;
        case "過重":
            color = 'overweightcolor';
            break;
        case "輕度肥胖" :
            color = 'obeseIcolor';
            break;
        case "中度肥胖" :
            color = 'obeseIIcolor';
            break;
        case "重度肥胖" :
            color = 'obeseIIIcolor';
            break;
    }
    obj.color = color;
    obj.date = getToday();
    data.unshift(obj);
    init(data);
    localStorage.setItem('listData',JSON.stringify(data))//新增至第一筆
    
});


function init(items){
    if (items.length === 0){
        list.innerHTML = '<h2>目前無紀錄</h2>'
    }else if (items.length >= 0){
    str = "";
    for (let i = 0; i < items.length; i++) {
      str += `
        <div class="list">
            <ul class="list-ul d-flex ${items[i].color}">
                <li>${items[i].statu}</li>
                <li><span>BMI</span>${items[i].BMI}</li>
                <li><span>weight</span>${items[i].weight}kg</li>
                <li><span>height</span>${items[i].height}cm</li>
                <li><span>${items[i].date}</span></li>
                <a href="#"><img data-index=${i} src="./img/baseline_highlight_off_black_24dp.png"></a>
            </ul> 
        </div>`
    }
    str+= `<a href="#" class="deleteAll">清除全部紀錄</a>`;
    list.innerHTML = str;
    }
    
}


//判斷BMI
function checkBMI(BMI){
    btn2.className = 'btn2'; //清空全部class 並置換成指定class 重新帶入class用
    if (BMI<18.5){
        btn2.classList.add('underweight');
    return "過輕";
    }else if (18.5<=BMI && BMI<24){
        btn2.classList.add('normal');
    return "理想";
    }else if (24<=BMI && BMI<27){
        btn2.classList.add('overweight');
        return "過重";
    }else if (27<=BMI && BMI<30){
        btn2.classList.add('obeseI');
        return "輕度肥胖";
    }else if (30<=BMI && BMI<35){
        btn2.classList.add('obeseII');
        return "中度肥胖";
    }else if (BMI>=35){
        btn2.classList.add('obeseIII');
        return "重度肥胖";
    }
}

//輸入錯誤 清空文字
function empty(){
    height.value='';
    weight.value='';
}

//切換 和 清空input的值
img.addEventListener('click',function(){
    toggle(); //切回去
    height.value='';
    weight.value='';
});





//run 及 reset 兩個元件的 display 切換
function toggle(){
    btn.classList.toggle('d-none')
    btn2.classList.toggle('d-none')
}

//日期時間
function getToday(){
    let now = new Date();
    let yyyy = now.getFullYear();
    let MM = now.getMonth()+1;
    if(MM<10){
        MM="0"+MM;
    }
    let dd = now.getDate();
    if(dd<10){
        dd= "0"+dd;
    }
    date = `${MM}-${dd}-${yyyy}`
    return date;
}



//單一筆資料
list.addEventListener('click',deleteData);

function deleteData(e){
    let index = e.target.dataset.index;
    if(e.target.nodeName !== 'IMG'){
        return;
    }
    data.splice(index,1);
    localStorage.setItem('listData',JSON.stringify(data));
    init(data);
}

//刪除全部資料
list.addEventListener('click',function(e){
    if(e.target.nodeName === "A"){
        data.length= 0;
        localStorage.setItem('listData',JSON.stringify(data));
        init(data);
    }
})

