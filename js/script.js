
$('.slct').click(function(){
	/* Заносим выпадающий список в переменную */
	var dropBlock = $(this).parent().parent().parent().find('.dropBlock');
//console.log(dropBlock.is(':hidden') );
//dropBlock.slideToggle();
	/* Делаем проверку: Если выпадающий блок скрыт то делаем его видимым*/
	// if( dropBlock.is(':hidden') ) {
	// 	dropBlock.slideDown();

	// 	/* Выделяем ссылку открывающую select */
	// 	$(this).addClass('active');

	// 	/* Работаем с событием клика по элементам выпадающего списка */
		$('.drop').find('li').click(function(){

			/* Заносим в переменную HTML код элемента
			списка по которому кликнули */
			var selectResult = $(this).html();

			/* Находим наш скрытый инпут и передаем в него
			значение из переменной selectResult */
			$(this).parent().parent().find('input').val(selectResult);

			/* Передаем значение переменной selectResult в ссылку которая
			открывает наш выпадающий список и удаляем активность */
			$(this).parent().parent().parent().find('.slct').html(selectResult);

			/* Скрываем выпадающий блок */
			dropBlock.slideUp();
		});

	// /* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
	// } else {
	// 	$(this).removeClass('active');
	// 	dropBlock.slideUp();
	// }

	// /* Предотвращаем обычное поведение ссылки при клике */
	// return false;
});

/*$('#selectList').click(function(){
    $("#dropList").slideToggle();
});*/



$(function(){
 
    $( "#slider-range" ).slider({
    animate: "slow",
    range: true,
    min: 0,
    max: 100000,
    values: [ 10000, 20000 ],
    value: 10,
    step: 100,
    slide: function( event, ui ) {
    $( "#price" ).val( ui.values[ 0 ] + " руб. - " + ui.values[ 1 ] + " руб.");
    }
    });
    $( "#price" ).val( $( "#slider-range" ).slider( "values", 0 ) +
    ' руб. - ' + $( "#slider-range" ).slider( "values", 1 ) + " руб.");
    
});



function plus(elem){
    var num = Number(elem.nextElementSibling.innerText);
    var numFrom = document.getElementById("from"); 
    var numTo = document.getElementById("to");  
    if (Number(numFrom.innerText) + 1 > Number(numTo.innerText) && elem.nextElementSibling === numFrom){
        numFrom.innerHTML = Number(numFrom.innerText) + 1;
        numTo.innerHTML = Number(numTo.innerText) + 1;
        
    }else{
        elem.nextElementSibling.innerHTML = num + 1;
    }
    
}
function minus(elem){
    var num = Number(elem.previousElementSibling.innerText);
    var numFrom = document.getElementById("from"); 
    var numTo = document.getElementById("to"); 
    if (num > 0){
        if (Number(numFrom.innerText) > Number(numTo.innerText) - 1 && elem.previousElementSibling === numTo){
            numFrom.innerHTML = Number(numFrom.innerText) - 1;
            numTo.innerHTML = Number(numTo.innerText) - 1;
            
        }else{
            elem.previousElementSibling.innerHTML = num - 1;
        }
        //elem.previousElementSibling.innerHTML = num - 1;
    }
}


function selectCountPeople(elem){
    var buttons = elem.parentElement.getElementsByTagName("div");
    for (var i = 0; i < buttons.length; i++){
        if (buttons[i].classList.contains("active")){
            buttons[i].classList.remove("active");
            break;
        }
    }
    if (!elem.classList.contains("active")){
        elem.classList.add("active");
    }
    if (elem.parentElement == document.getElementById("old")){
        var outputElem = document.getElementById("resultOld");
        outputElem.innerHTML = "<span>" + elem.innerText + "</span>" + " взрослый";
    }else {
        var outputElem = document.getElementById("resultYoung");
        outputElem.innerHTML = "и " + "<span>" + elem.innerText + "</span>"  + " детский";
    }
    if (elem.innerText == "нет"){
        var outputElem = document.getElementById("resultYoung");
        outputElem.innerHTML = "";
    }
   
}
function toggleList(elem){
    $(elem.nextElementSibling).slideToggle();
}

$( ".formInput").click(function(){
    $(this).parent().find(".dropBlock").slideToggle();
});
$( "#buttonExtra").click(function(){
    $(this).parent().find(".extra").slideToggle();
    if ($(this).text() == "дополнительно"){
        $(this).text("скрыть") 
    }else{
        $(this).text("дополнительно");
    }
});
function checkedExtraInfo(elem){
    var brnTurnOn = elem.children[0];
    var brnTurnOff = elem.children[2];
    if (elem.classList.contains("active")){
        elem.classList.remove("active");
        brnTurnOff.style.display = "none";
        brnTurnOn.style.display = "flex";
    }else{
        elem.classList.add("active");
        brnTurnOff.style.display = "flex";
        brnTurnOn.style.display = "none";
    }
   
}
function errorShow(flag){
    document.getElementById("resultContent").style.display = "block";
    var errorBlock = document.getElementById("errorBlock");
    if (flag){
        errorBlock.style.display = "block";
    }else{
        errorBlock.style.display = "none";
    }
   

}
function request(){
    var country = document.getElementById("select").getAttribute("value");
    var costFrom = $("#slider-range").slider("values", 0);
    var costTo = $("#slider-range").slider("values", 1);
    var dayFrom = document.getElementById("from").innerText;
    var dayTo = document.getElementById("to").innerText;
    var pepoleOld = document.getElementById("resultOld").children[0].innerText;
    var pepoleYoung = document.getElementById("resultYoung").children[0].innerText;
    var rusPlace = is_cheked(document.getElementById("rusPlace"));
    var personTransport = is_cheked(document.getElementById("personTransport"));
    var alhogol = is_cheked(document.getElementById("alhogol")); 
   
    var hotelObj = searchHotel(country, costFrom, costTo, dayFrom, dayTo, pepoleOld, pepoleYoung, rusPlace, personTransport, alhogol);

    var resultBlock = document.getElementById("resultContent");
        resultBlock.style.display = "block";
        resultBlock.children[0].children[1].style.display = "none";

    if (hotelObj == -1){
        /*console.log("ERROR!!!");*/
        errorShow(true);
    }else{
        hotelObj.result();
        errorShow(false);
    }
    
}

function is_cheked(obj){
    if (obj.classList.contains("active")){
        return true;
    }else {
        return false;
    }
}

class Landmark{
    constructor(country, name, urlImage, description, flagLooked){
        this.country = country;
        this.name = name;
        this.urlImage = urlImage;
        this.description = description;
        this.flagLooked = false;
    }
    resultShow(elem){
        console.log(elem);

        var titleLandmark = document.createElement("div");
        titleLandmark.classList.add("title");   
        titleLandmark.setAttribute("onclick", "toggleList(this)");     
        titleLandmark.innerText = this.name;
        elem.appendChild(titleLandmark);

        var dropMenuListChild = document.createElement("div");
        dropMenuListChild.classList.add("dropMenuListChild");
        elem.appendChild(dropMenuListChild);

        var divRow = document.createElement("div");
        divRow.classList.add("row");
        dropMenuListChild.appendChild(divRow);

        var divCol4 = document.createElement("div");
        divCol4.classList.add("col-md-4");
        divRow.appendChild(divCol4);

        var inmLandmarks = document.createElement("img");
        inmLandmarks.setAttribute("src", this.urlImage);
        divCol4.appendChild(inmLandmarks);

        var divCol8 = document.createElement("div");
        divCol8.classList.add("col-md-8");
        divRow.appendChild(divCol8);

        var h3 = document.createElement("h3");
        h3.innerText = "Описание"
        divCol8.appendChild(h3);

        var descriptionLandmark = document.createElement("p");
        descriptionLandmark.innerText = this.description;
        divCol8.appendChild(descriptionLandmark);        
    }
}
class Hotel{
    
    constructor(name, country, cost, stars, urlImg, rusPlace, personTransport, alcogol){
        this.countDays = 0;
        this.resultCost = 0;
        this.name = name;
        this.country = country;
        this.cost = cost;
        this.stars = stars;
        this.urlImg = urlImg;

        this.rusPlace = rusPlace;
        this.personTransport = personTransport;
        this.alcogol = alcogol;
    }
    result(){
        var resultBlock = document.getElementById("resultContent");
        resultBlock.style.display = "block";
        resultBlock.children[0].children[1].style.display = "flex";
        document.getElementById("imgHotel").src = this.urlImg;
        document.getElementById("infoHotel").children[0].innerHTML = this.name;
        document.getElementById("infoHotel").children[1].innerHTML = '<i class="fas fa-globe-americas"></i> ' + this.country;
        document.getElementById("costHotel").innerHTML = '<i class="fas fa-ruble-sign"></i> ' +  Math.round(this.resultCost);
        document.getElementById("infoHotel").children[2].innerHTML = "";
        document.getElementById("infoHotel").children[3].innerHTML = "";
        for (var i = 0; i < this.stars; i++){
            document.getElementById("infoHotel").children[2].innerHTML += '<i class="fas fa-star"></i>';
        }
        if (this.rusPlace){
            document.getElementById("infoHotel").children[3].innerHTML += '<i class="fas fa-child"></i>';
        }
        if (this.personTransport){
            document.getElementById("infoHotel").children[3].innerHTML += '<i class="fas fa-car-alt"></i>';
        }
        if (this.alcogol){
            document.getElementById("infoHotel").children[3].innerHTML += '<i class="fas fa-wine-bottle"></i>';
        }
    }
}

var listHotelsObj = [];
var listLandmarkObj = [];

$(".dropMenuList").click(function(){
    $(".dropMenuList").find(".dropMenuListChild").slideToggle();
});

function createBtnDays(countDays){
    document.getElementById("tourDaysBlock").style.display = "block";
    var daysPlace = document.getElementById("daysPlace");
    for (var i = 0; i < countDays; i++){
        var li = document.createElement("li");
        li.classList.add("dayNumber");
        li.setAttribute("id", "dayMove");
        li.setAttribute("onclick", "searchMove(this)");
        li.innerText = i;
        daysPlace.appendChild(li);
        if (i < countDays - 1){
            var divLine = document.createElement("div");
            divLine.classList.add("line");
            daysPlace.appendChild(divLine);

        }
    
    }
}
createBtnDays(5);
function findLandmarks(){
    var listAcceptMove = [];
    var country = document.getElementById("countryName").innerText;
    var dayFrom = document.getElementById("from").innerText;
    var dayTo = document.getElementById("to").innerText;
    var days = dayTo - dayFrom;
    var count = 0;
    
    for (var i = 0; i < listLandmarkObj.length; i++){
        //console.log(listLandmarkObj);
        if (listLandmarkObj[i].country == country){
            listAcceptMove.push(listLandmarkObj[i]);
            //listLandmarkObj[i].flagLooked = true;
        }
    }
    return listAcceptMove
}
function searchMove(elem){
    var resultBlock = document.getElementById("infoTourDays");
    document.getElementById("numDay").innerText = elem.innerText;
    resultBlock.innerHTML = " ";
    
    var arrayLandmarks = findLandmarks();
    console.log(Math.floor(Math.random() * (arrayLandmarks.length - 1)) + 1);
    var countLandmarks = Math.floor(Math.random() * (arrayLandmarks.length - 1)) + 1;
        for (var i = 0; i < countLandmarks; i++){
            if (arrayLandmarks[i]){
                var li = document.createElement("li");
                li.classList.add("dropMenuList");
                resultBlock.appendChild(li);
                //console.log(arrayLandmarks[i]);
                arrayLandmarks[i].resultShow(li);
            }
            
        }
}
function searchHotel(country, costFrom, costTo, dayFrom, dayTo, pepoleOld, pepoleYoung, rusPlace, personTransport, alcogol){
    var listAcceptHotels = [];
    for (var i = 0; i < listHotelsObj.length; i++){
        if (
                listHotelsObj[i].country == country &&
                listHotelsObj[i].cost >= costFrom &&
                listHotelsObj[i].cost <= costTo &&
                listHotelsObj[i].rusPlace == rusPlace &&
                listHotelsObj[i].personTransport == personTransport &&
                listHotelsObj[i].alcogol == alcogol
            )
            {
                if (dayTo != dayFrom){
                    listHotelsObj[i].countDays = dayTo - dayFrom;
                }else {
                    listHotelsObj[i].countDays = dayTo;
                }
                listHotelsObj[i].resultCost = 0;
                if (pepoleYoung ){
                    listHotelsObj[i].resultCost = (Number(pepoleOld) + Number(pepoleYoung) * 0.8) * listHotelsObj[i].countDays * listHotelsObj[i].cost;
                    
                }else {
                    listHotelsObj[i].resultCost = pepoleOld *  listHotelsObj[i].countDays * listHotelsObj[i].cost;
                }
                listAcceptHotels.push(listHotelsObj[i]);
            
        }
    }
    var index = Math.floor(Math.random() * listAcceptHotels.length);
   /*console.log(listAcceptHotels);
    console.log(index);
    console.log(listAcceptHotels[index]);*/
    if (listAcceptHotels.length == 0){
        return -1;
    }
    return listAcceptHotels[index];
    
}
const hotel1 = new Hotel(
    "Club St. George Resort",
    "Кипр",
    55000,
    3,
    "img/testHotel.jpg",
    true,
    true,
    true
);
listHotelsObj.push(hotel1);
const hotel2 = new Hotel(
    "Forty Winks Phuket (ex. Arimana)",
    "Тайланд",
    20000,
    4,
    "img/testHotel.jpg",
    true,
    false,
    true
);
listHotelsObj.push(hotel2);
const hotel3 = new Hotel(
    "Klas Dom Suite Annexe (ex. Sahin Klas)",
    "Алания",
    66000,
    1,
    "img/testHotel.jpg",
    false,
    false,
    true
);
listHotelsObj.push(hotel3);
const hotel4 = new Hotel(
    "Bella Elena",
    "Греция (Крит)",
    20816,
    2,
    "img/testHotel.jpg",
    false,
    false,
    false
);
listHotelsObj.push(hotel4);
const hotel5 = new Hotel(
    "Villa Diasselo",
    "Греция (Крит)",
    21630,
    3,
    "img/testHotel.jpg",
    false,
    false,
    false
);
listHotelsObj.push(hotel5);
const hotel6 = new Hotel(
    "Rena",
    "Греция (Крит)",
    12432,
    1,
    "img/testHotel.jpg",
    false,
    false,
    false
);
listHotelsObj.push(hotel6);









const landmark1 = new Landmark(
    "Кипр",
    "Дворец Архиепископа",
    "img/dvorets-arhiepiskopa.jpg",
    "Сооружение XX в. в псевдовенецианском стиле в столице Кипра Никосии. Рядом есть старое здание дворца XVIII в., которое сильно пострадало после вторжения турок в 1974 г. Это место служит резиденцией для главы местной церкви – Архиепископа Кипра. Во дворце есть музей, библиотека, галерея искусств и собор."
);
listLandmarkObj.push(landmark1);

const landmark2 = new Landmark(
    "Греция (Крит)",
    "Ираклион",
    "img/heraklion.jpg",
    "Древний исторический центр острова Крит, названный в честь мифологического героя Геракла. Если верить «Географии» древнегреческого мыслителя, географа и историка Страбона, город уже существовал в I веке н.э. и являлся морским портом минойского города Кносс. Ираклионом в разное время владели арабы, византийцы, венецианцы и турки. В Средние века здесь находился крупнейший рынок по торговле рабами на всем Средиземноморье. Остров соединился с Грецией только в начале XX столетия."
);
listLandmarkObj.push(landmark2);

const landmark3 = new Landmark(
    "Греция (Крит)",
    "Аквапарк «Water City»",
    "img/akvapark-water-city.jpg",
    "Аквапарк находится в Ираклионе, его территория занимает площадь более 80 тысяч м². Это самый большой парк водных развлечений на Крите. В него входит 13 бассейнов и множество скоростных горок разного уровня сложности. Также в аквапарке имеются менее экстремальные аттракционы, поэтому каждый посетитель найдет себе занятие. Для детей оборудованы отдельные бассейны и площадки с разнообразными водными играми."
);
listLandmarkObj.push(landmark3);

const landmark4 = new Landmark(
    "Греция (Крит)",
    "Айос-Николаос",
    "img/agios-nikolaos.jpg",
    "Небольшой город на севере Крита, известное и популярное туристическое направление. Предшественник современного Айос-Николаоса возник на месте древнего дорийского поселения Лато, но постепенно пришел в упадок. Новые жители появились уже в Средние века во время венецианского владычества. В 1646 году в результате войны с турками венецианцы сожгли поселение. В третий раз Айос-Николаос возродился в середине XIX столетия."
);
listLandmarkObj.push(landmark4);