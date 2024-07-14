document.addEventListener('DOMContentLoaded', function() 
{
    new GraphModal();
    const menu = document.getElementById('menuList');
    const menuItems = menu.querySelectorAll('#menuList li');

    const headerSelect = document.querySelector('.header-select');
    const headerSelectTitle = headerSelect.querySelector('.header-title');
    const headerSelectLabels = headerSelect.querySelectorAll('.header-select-label');


    // Боковое меню
    menu.addEventListener('click', function(event)
    {
        event.preventDefault()
        const liElement = event.target.closest('li');

        if(liElement && menuList.contains(liElement))
        {
            menuItems.forEach(item => 
                {
                    item.classList.remove('active')
                })
            liElement.classList.add('active')
        }
    });


    headerSelectTitle.addEventListener('click', () =>
    {
        if('active' === headerSelect.getAttribute('data-state'))
        {
            headerSelect.setAttribute('data-state', '');
        }
        else 
        {
            headerSelect.setAttribute('data-state', 'active');
        }
    });

    for (let i = 0; i < headerSelectLabels.length; i++)
    {
        headerSelectLabels[i].addEventListener('click', (event) =>
        {
            headerSelectTitle.textContent = event.target.textContent;
            headerSelect.setAttribute('data-state', '');
            event.target.classList.add('cheked')
        })
    }


    const inputs = document.querySelectorAll('.create-input')
    inputs.forEach(item =>
        {
            item.addEventListener('click', function()
            {
                const label = item.nextElementSibling;
               if(!item.hasAttribute('checked'))
               {
                 item.setAttribute('checked', 'checked');
                 label.classList.add('cheked-icon');
               }
               else 
               {
                    item.removeAttribute('checked');
                    label.classList.remove('cheked-icon');
               }
            })
        })
    // мультиселект
    VirtualSelect.init({ 
        ele: '#multipleSelect',
        optionsSelectedText: '',
        allOptionsSelectedText: '',
        optionsCount: 14, 
        disableAllOptionsSelectedText: true,
        alwaysShowSelectedOptionsCount: false,
        alwaysShowSelectedOptionsLabel: true,
        showValueAsTags: true,
        optionCount: 14 
      });



    const wrapper = document.querySelector('.vscomp-value');
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;
    // Начало перетаскивания
    wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    });


    // Окончание перетаскивания
    document.addEventListener('mouseup', () => {
    isDown = false;
    });

    // Движение мыши при перетаскивании
    wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2; // Ускорение движения
    wrapper.scrollLeft = scrollLeft - walk;
    });


    const elements = document.querySelectorAll('.vscomp-options-container');
    elements[0].id = 'scrollbar-multiselect';
    elements[1].id = 'modal-scrollbar';
    const scrollBarsStatistics = 
    [
        {id: 'scrollbar-multiselect'},
        {id: 'modal-scrollbar'},
        {id: 'menuList'},
    ]

    scrollBarsStatistics.forEach(item =>
        {
            let scrollBar = document.getElementById(item.id);
            new SimpleBar(scrollBar,
                {
                    wrapContent: true
                });
        })


    //calendar 
    const daysTag = document.querySelector(".days");
    const daysTagSecond = document.querySelector(".days.second");
    const daysTagThird = document.querySelector(".days.third");
    const daysTagFourth = document.querySelector(".days.fourth");

    const currentDate = document.querySelector(".current-date");
    const currentDateSecond = document.querySelector(".current-date.second");
    const currentDateThird = document.querySelector(".current-date.third");
    const currentDateFourth= document.querySelector(".current-date.fourth");

    const prevNextIcon = document.querySelectorAll(".icons.first span");
    const prevNextIconSecond = document.querySelectorAll(".icons.second span");
    const prevNextIconThird = document.querySelectorAll(".icons.third span");
    const prevNextIconFourth = document.querySelectorAll(".icons.fourth span");
    const buttonsCalendarArrow = document.querySelectorAll('.statistics-calendar-buttons.first span');
    const buttonsCalendarArrowSecond = document.querySelectorAll('.statistics-calendar-buttons.second span');
    const buttonsCalendarArrowThird = document.querySelectorAll('.statistics-calendar-buttons.third span');
    const buttonsCalendarArrowFourth = document.querySelectorAll('.statistics-calendar-buttons.fourth span');
    const allTitleYears = document.querySelectorAll('.statistics-calendar-year');
    // console.log(allTitleYears)

    let date = new Date();
    let currYear = date.getFullYear();
    let currMonth = date.getMonth();
    let currYearSecond = date.getFullYear();
    let currMonthSecond = date.getMonth();
    let currYearThird = date.getFullYear();
    let currMonthThird = date.getMonth();
    let currMonthFourth = date.getMonth();
    let currYearFourth = date.getFullYear();
    let fullYear = date.getFullYear();
    let endFullYear = date.getFullYear();

    const renderCalendar = (daysTag, currentDate, currMonth, currYear) => {

    
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
            lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
            lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
            lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
        let liTag = "";
    
        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }
    
        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                            && currYear === new Date().getFullYear() ? "active-day" : "";
            liTag += `<li class="${isToday}">${i}</li>`;
        }
    
        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
        }
        allTitleYears.forEach(item =>
            {
                item.innerText = fullYear;
            })
        currentDate.innerText = `${months[currMonth]}`;
        daysTag.innerHTML = liTag;
    }

    renderCalendar(daysTag, currentDate, currMonth, currYear);
    renderCalendar(daysTagSecond, currentDateSecond, currMonthSecond, currYearSecond);
    renderCalendar(daysTagThird, currentDateThird, currMonthThird, currYearThird);
    renderCalendar(daysTagFourth, currentDateFourth, currMonthFourth, currYearFourth);
    

    function handleButtonStartDateClick(item, currYear, title)
    {

        item.forEach(arrow =>
            {
                arrow.addEventListener('click', () =>
                {
                    fullYear = arrow.id === 'prev' ? --currYear : ++currYear;
                    title.innerText = fullYear;
                    console.log(fullYear)
                });
            })
    }

    handleButtonStartDateClick(buttonsCalendarArrow, currYear, allTitleYears[0]);
    handleButtonStartDateClick(buttonsCalendarArrowThird, currYear, allTitleYears[2]);

    function handleButtonEndDateClick (item, currYear, title)
    {
        item.forEach(arrow =>
            {
                                arrow.addEventListener('click', () =>
                {
                    endFullYear = arrow.id === 'prev' ? --currYear : ++currYear;
                    title.innerText = endFullYear;
                    console.log(endFullYear)
                });
            })
    }
    handleButtonEndDateClick(buttonsCalendarArrowSecond, currYear, allTitleYears[1]);
    handleButtonEndDateClick(buttonsCalendarArrowFourth, currYear, allTitleYears[3]);


    function handleIconClick(icons, currMonth, currYear, daysTag, currentDate) {
        icons.forEach(icon => {
            icon.addEventListener("click", () => {
                currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
                if (currMonth < 0 || currMonth > 11) {
                    let date = new Date(currYear, currMonth, new Date().getDate());
                    currYear = date.getFullYear();
                    currMonth = date.getMonth();
                } else {
                    date = new Date();
                }
                renderCalendar(daysTag, currentDate, currMonth, currYear);
                attachEventListenersToListItems(currMonth);
            });
        });
    }
    
    handleIconClick(prevNextIcon, currMonth, currYear, daysTag, currentDate);
    handleIconClick(prevNextIconSecond, currMonthSecond, currYearSecond, daysTagSecond, currentDateSecond);
    handleIconClick(prevNextIconThird, currMonthThird, currYearThird, daysTagThird, currentDateThird);
    handleIconClick(prevNextIconFourth, currMonthFourth, currYearFourth, daysTagFourth, currentDateFourth);


    let startDate = null;
    let startDateModal = null;
    let endDate = null; 
    let endDateModal = null; 

    function attachEventListenersToListItems(currMonth) {
        let calendars = document.querySelectorAll('.wrapper');
        calendars.forEach(function(calendar) {
            let listItems = calendar.querySelectorAll('ul li');
            listItems.forEach(function(item) {
                item.addEventListener('click', function() {
                    if (!item.classList.contains('inactive')) {
                        // Удаляем класс 'selected' из всех элементов списка внутри текущего календаря
                        
                        let siblings = calendar.querySelectorAll('ul li');
                        siblings.forEach(function(sibling) {
                            
                            sibling.classList.remove('selected');
                        });
                        // Добавляем класс 'selected' только к выбранному элементу списка
                        item.classList.add('selected');
                        
                        // Определяем к какому календарю принадлежит выбранная дата

                        let year = fullYear.toString().slice(-2);
                        let endYear = endFullYear;
                        let day = parseInt(item.textContent);
                        let formatteddate = `${day < 10 ? '0' + day : day}.${(currMonth + 1) < 10 ? '0' + (currMonth + 1) : (currMonth + 1)}.${year}`;
                        let endFormatedDate = `${day < 10 ? '0' + day : day}.${(currMonth + 1) < 10 ? '0' + (currMonth + 1) : (currMonth + 1)}.${endYear}`;


                        switch (calendar.id)
                        {
                            case 'calendar1':
                                startDate = formatteddate;
                                document.getElementById('select-start-date').value = startDate;
                                console.log("startDate:", startDate);
                                $('#calendar1').hide()
                                break;
                            case 'calendar2':
                            endDate = endFormatedDate;
                             document.getElementById('select-end-date').value = endDate;
                            console.log("endDate:", endDate);   
                             $('#calendar2').hide()             
                            break;
                            case 'calendar3':     
                                startDateModal = formatteddate;
                                document.getElementById('select-modal-start-date').value = startDateModal;
                                console.log("endDateModal:", startDateModal);        
                                 $('#calendar3').hide()   
                                break;
                            case 'calendar4':     
                                endDateModal = endFormatedDate;
                                document.getElementById('select-modal-end-date').value = endDateModal;
                                console.log("endDateModal:", endDateModal);      
                                 $('#calendar4').hide()     
                                break;
                        }
                    }
                });
            });
        });
    }
    
    // Вызываем функцию для привязки обработчиков событий к элементам списка при загрузке страницы или после изменения месяца
    
    attachEventListenersToListItems(currMonth);

    
 
    const onClickImgs = document.querySelectorAll('.statistics-img');
    const calendars = document.querySelectorAll('.wrapper');
    const calendar1 = document.querySelector('.wrapper.start-calendar');
    const calendar2 = document.querySelector('.wrapper.end-calendar');
    const calendar3 = document.querySelector('.wrapper.modal-start-calendar');
    const calendar4 = document.querySelector('.wrapper.modal-end-calendar');

    // Обработчик закрытия календаря вне облатси 
    document.addEventListener('click', function(event)
    {
        function closeAllCalendars() 
        {   
        calendars.forEach(function(calendar) {
            calendar.style.display = 'none';
        });
        }
    // Обработчик события клика вне календарей и изображений
    
        const targetElement = event.target;
        // Проверяем, произошел ли клик вне календарей и изображений
        let isInsideCalendar = false;
    
        calendars.forEach(function(calendar) 
        {
            if (calendar.contains(targetElement)) {
                isInsideCalendar = true;
            }
           
        });
        let isInsideImg = false;
        onClickImgs.forEach(function(img) {
            if (img.contains(targetElement)) {
                isInsideImg = true;
            }
        });
        if (!isInsideCalendar && !isInsideImg) {
            closeAllCalendars();
        }
    })
    let currentCalendar = null; // переменная для отслеживания текущего открытого календаря

    function handleImgClick(calendar) {
        return function() {
            if (calendar.style.display === 'block') {
                calendar.style.display = 'none';
                currentCalendar = null; // обнуляем текущий календарь при закрытии
            } else {
                // закрываем текущий календарь, если есть
                if (currentCalendar !== null) {
                    currentCalendar.style.display = 'none';
                }
                calendar.style.display = 'block';
                currentCalendar = calendar; // устанавливаем текущий календарь
            }
        };
    }


    // Добавляем обработчик события для клика за пределами календаря

    onClickImgs.forEach(function(img, index)
    {   
        let calendar;
        switch(index) {
            case 0:
                calendar = calendar1;
                break;
            case 1:
                calendar = calendar2;
                break;
            case 2:
                calendar = calendar3;
                break;
            case 3:
                calendar = calendar4;
                break;
        }
        img.addEventListener('click', handleImgClick(calendar))
        
    });

});






$(document).ready(function()
{   
    function updateDateTime() {
        let currentDate = new Date();
        
        // Форматирование даты (день.месяц.год)
        let day = currentDate.getDate().toString().padStart(2, '0');
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        let year = currentDate.getFullYear();
        let formattedDate = day + '/' + month + '/' + year;
        // Форматирование времени (часы:минуты:секунды)
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();
        let formattedTime = hours + ':' + minutes + ':' + seconds;
        
        // Обновление содержимого элементов с id="date" и id="time"
        $('time[dateTime]').text(formattedDate);
    
        $('.header-time time').text(formattedTime);
    }

    setInterval(updateDateTime, 1000);
    let position = 0;
    const slidesToShow = 5;
    const track = $('.favorites-card-grid');
    const item = $('.favorites-item');
    const itemCount = item.length;
    const btnPrev = $('.favorites-buttons-prev');
    const btnNext = $('.favorites-buttons-next');
    let firstClick = false;
    let firstNextClick = false;
    let firstPrevClick = false;
    let secondPreClick = false;
    
    btnPrev.click(function()
    { 
        if(firstClick)
        {
            if(position === -125)
            {
                position += 125;
                console.log('prev')
            }
            else 
            {
                position += 175;
                firstClick = false;
                firstPrevClick = true;
                console.log('yes')
            }
        }
        else if(position === -315)
        {
            position = 0;
            secondPreClick = false;
            firstPrevClick = false;
            console.log('pol-full')
        }
        else 
        {
            position += 365;
            firstPrevClick = false;
            secondPreClick = true;
            console.log('full')
        }

        setPosition();
        checkButtons();
    })
    
    btnNext.click(function()
    {
        firstClick = true;
         if(position === 0 || firstNextClick)
        {
            position -= 125;
            firstNextClick = false
            console.log('next')    
        }

        else 
        {
           console.log(firstPrevClick)
           console.log(secondPreClick, 'правда')
            if(firstPrevClick || secondPreClick)
            {
                position -= 175;
                firstPrevClick = false;
                secondPreClick = false;
                console.log('no')
            }
            else 
            {
                 position -= 365;
                 console.log('return')
            }
        }

        setPosition();
        checkButtons();
    })
    const setPosition = () =>
    {
        track.css({
                transform: `translateX(${position}px)`
            }
        )     
        console.log(position)   
    }
    const checkButtons = () =>
    {
        btnPrev.prop('disabled', position === 0)
        btnNext.prop('disabled', 
                      position <= -(itemCount - slidesToShow ) * 365)
    }
    checkButtons();

  
    $('#statistics-form').submit(function(e)
    {
        e.preventDefault();

        let inputFirstValue = $('#select-start-date').val();
        let inputSecondValue = $('#select-end-date').val();
        let selectedValues = $('#multipleSelect').val();
        let selectTimeContent = $('#selectTime').text();
        let selectToContent = $('#selectTo').text();
        let combinedString = selectTimeContent + ' - ' + selectToContent;
        console.log(selectToContent)
        const data = {
                   startDate: inputFirstValue,
                    endDate: inputSecondValue,
                    days: selectedValues,
                    time: combinedString
                }

        let cardHTML  = $('<li class="favorites-item">' +
                                '<div class="favorites-header">' +
                                    '<div class="favorites-title">Insight Analytics Board</div>' +
                                   ' <div class="favorites-change">' +
                                        '<div class="favorites-edit" data-graph-path="third">' +
                                            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                                                '<path d="M16 3L21 8L8 21H3V16L16 3Z" stroke="#ADABFF" stroke-width="2" stroke-linecap="round"' +
                                                    'stroke-linejoin="round" />' +
                                            '</svg>' +
                                        '</div>' +
                                        '<div class="favorites-trash">' +
                                            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                                                '<path d="M3 6H5H21" stroke="#ADABFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />' +
                                                '<path' +
                                                   ' d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"'+
                                                    'stroke="#ADABFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />' +
                                                '<path d="M10 11V17" stroke="#ADABFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />' +
                                                '<path d="M14 11V17" stroke="#ADABFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />' +
                                            '</svg>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="favorites-media">' +
                                    '<img class="favorites-media-img" src="./images/media-card.jpg" alt="">' +
                                '</div>' +
                                '<div class="favorites-information">' +
                                    '<div class="favorites-body">' +
                                        '<div class="favorites-wrapper-calendar">' +
                                                '<div class="favorites-calendar">' +
                                                    '<div class="favorites-date">' + inputFirstValue + ' - ' + inputSecondValue + '</div>' +
                                                    '<div class="favorites-selected-date">' + selectedValues.join(', ') + '</div>' +                                                 
                                                '</div>' +
                                       ' </div>' +
                                        '<div class="favorites-time">' +
                                        '<div class="favorites-time-text">' + selectTimeContent + ' - ' + selectToContent + '</div>' +
                                        '</div>' +
                                    '</div>'+
                               ' </div>' +
                                '<button class="favorites-search-modal" data-graph-path="first">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
                                        '<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"' +
                                        'stroke="#ADABFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />' +
                                        '<path d="M21.0004 20.9999L16.6504 16.6499" stroke="#ADABFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />' +
                                    '</svg>' +
                                '</button>' +
                            '</li>')
    $('.favorites-card-grid').prepend(cardHTML);
    
    $('#manualTimeInput').on('change', function(){
        let enteredTime = $(this).val();
        // Здесь вы можете выполнить необходимые действия с введенным временем
        console.log("Entered time:", enteredTime);
    });
        
    })

    let valueProgresbar = 
    [
        {
            incoming: 348,
            outbound: 864
        },
        {
            answered: 1300,
            unanswered: 800
        },
        {
            callback: 2500,
            disc: 2800
        },
        {
            working: 3624,
            pauses: 7410
        }
    ]

    function drawProgressBar(array) {
        const objectNumber = $('.groups-information-number');
        const incoming = array[0].incoming;
        const outbound = array[0].outbound;
        const answered = array[1].answered;
        const unanswered = array[1].unanswered;
        const callback = array[2].callback;
        const disc = array[2].disc;
        const working = array[3].working;
        const pauses = array[3].pauses;
        const totalCalls = incoming + outbound;
        const totalCallsData = answered + unanswered;
        const totalClients = callback + disc;
        const totalOperators = working + pauses;
        const callsIncoming = Math.round((incoming / totalCalls) * 100);
        const callsOutbound = 100 - callsIncoming;
        const callsAnswered = Math.round((answered / totalCallsData) * 100);
        const callsUnanswered = 100 - callsAnswered;
        const clientsCallback = Math.round((callback / totalClients) * 100);
        const clientsDisc = 100 - clientsCallback;
        const operatorsWorking = Math.round((working / totalOperators) * 100);
        const operatorsPauses = 100 - operatorsWorking; 
        const allArray = array.flatMap(obj => Object.values(obj));

        objectNumber.each(function(index, item)
        {
            $(item).text(allArray[index])
        })

            $('#incomingBar').css('width', callsIncoming + '%');
            $('#outboundBar').css('width', callsOutbound + '%' );
            $('#answeredgBar').css('width', callsAnswered + '%' );
            $('#unansweredBar').css('width', callsUnanswered + '%' );
            $('#callbackBar').css('width', clientsCallback + '%' );
            $('#discBar').css('width', clientsDisc + '%' );
            $('#workingBar ').css('width', operatorsWorking + '%' );
            $('#pausesBar ').css('width', operatorsPauses + '%' );
    }
    drawProgressBar(valueProgresbar);

        ['from', 'to'].forEach(function(prefix) {
        $('#' + prefix + '-minutes').on('input', function(event) {
            let minutes = this.value.replace(/\D/g, '');
            
            if (minutes.length === 2) {
                $('#' + prefix + '-seconds').focus();
            } else {
                this.value = minutes;
            }
        });
    
        $('#' + prefix + '-seconds').on('input', function() {
            this.value.replace(/\D/g, '');
        });
    
        $('#' + prefix + '-seconds').on('focus', function() {
            let minutesInput = $('#' + prefix + '-minutes');
            if (minutesInput.val().length === 1) {
                minutesInput.val('0' + minutesInput.val());
            }
        });
    });

    $('.chevron-up').on('click', function() 
    {
        const parentdiv = $(this).parents('.statistics-time-input-container')
        const input = parentdiv.find('.time-input');
        input.each(function(index, item)
        {
            if(item.value === '')
            {
                item.value = '01'
            }
        })

    });



    let targetInput = null;

    $('.statistics-time-group-buttons.second button').on('click', function()
    {   
        if($(targetInput).attr('id') === 'from-minutes' || $(targetInput).attr('id') === 'from-seconds') 
        {
                targetInput = blur()
        }
    })
    $('.statistics-time-group-buttons.first button').on('click', function()
    {
            if($(targetInput).attr('id') === 'to-minutes' || $(targetInput).attr('id') === 'to-seconds') 
            {
                targetInput = blur()
            }
    })
    $('.change-value').on('click', function (e) 
    {
        if (targetInput) 
        { 
            let action = $(this).data('action');
            console.log(action)
            let currentValue = targetInput.value;
            console.log(currentValue)
            let newValue;
            if (action === 'increase') {
                newValue = parseInt(currentValue) + 1;
                if (newValue < 10) {
                    newValue = '0' + newValue;
                }
                if (newValue <= 100) {
                    targetInput.value = newValue;
                }
            } 
            else if (action === 'decrease') 
            {
                newValue = parseInt(currentValue) - 1;
                if (newValue >= 0) {
                    if (newValue < 10) {
                        newValue = '0' + newValue;
                    }
                    targetInput.value = newValue;
                }
            }
        } 
        else 
        {
            console.log('no-focus')
        }
    });

    $('#from-minutes, #to-minutes, #from-seconds, #to-seconds').on('focus', function() 
    {
        targetInput = (this)
        console.log(targetInput)
    });


    $('.vscomp-arrow').attr('data-state', '');
    $('.vscomp-arrow').on('click', function(e)
    {
        if('active' === $(this).attr('data-state'))
        {
            $(this).attr('data-state', '');
        }
        else
        {
            $(this).attr('data-state', 'active');
        }
    })
    $('.sidebar').hover(
    function() {
      $('.footer').addClass('hovered');
    },
    function() {
      $('.footer').removeClass('hovered');
    }
    );
    $('.header-circle').each(function(index, item)
    {
        if($(item).text().length === 3)
        {
            $(this).css('width', 'calc(100% + 10px)')
        }
        else if($(item).text().length === 2)
        {
             $(this).css('width', '100%')
        }
        else 
        {
            $(this).css('width', '20px')
        }
    })
    $(document).click(function(event) 
    {
        if(!$(event.target).closest('#multipleSelect').length) 
        {
             $('.vscomp-arrow').attr('data-state', '');
        }
         if(!$(event.target).closest('.header-select').length)
         {
            $('.header-select').attr('data-state', '');
         }
    });
})
