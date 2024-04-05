document.addEventListener('DOMContentLoaded', function()
{
    
    const selectSingle = document.querySelector('.statistics-dropdown-filter-operators-groups');
    const selecetSingleTitle = selectSingle.querySelector('.statistics-dropdown-filter-operators-groups-plus-minus-icon');
    const chartPie = echarts.init(document.getElementById('chartPie'));
    const chartBar = echarts.init(document.getElementById('chartBar'));

    let option = {
    series: [
        {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        roseType: 'radius',
        label: {
            show: false
        },
        itemStyle: {
            borderRadius: 6
        },
        color: ['#68EE76', '#8D79F6', '#FEBD38'],
        data: [
            { value: 90, name: 'green' },
            { value: 80, name: 'violet' },
            { value: 60, name: 'orange' }
        ]
        }
    ]
    };
    chartPie.setOption(option);

    let optionBar;
    let series = 
    [

        {
            data: [250, 200, 150, 80, 70, 110, 130],
            barWidth: 10,
            color: '#8EFB99',
            type: 'bar',
            stack: 'a',
            name: 'Incoming',
        },

        {
            data: [38, '-', 0, 20, 10, '-', 0],
            barWidth: 10,
            color: '#9F8DFB',
            type: 'bar',
            stack: 'b',
            name: 'Outgoing',
        },
        {
            data: [],
            barWidth: 8,
            color: '#ffff',
            type: 'bar',
            barGap: '40%',
            stack: 'e',
            name: ''
        },
        {
            data: [75, 20, 150, 0, '-', 50, 10],
            barWidth: 10,
            color: '#E0C6FD',
            type: 'bar',
            stack: 'c',
            name: 'Answered'
        },
        {
            data: [75, 20, 150, 0, '-', 50, 10],
            barWidth: 10,
            color: '#93AAFD',
            type: 'bar',
            stack: 'd',
            name: 'Unanswered'
        }
    ];
      
    const stackInfo = {};
    for (let i = 0; i < series[0].data.length; ++i) {
    for (let j = 0; j < series.length; ++j) {
        const stackName = series[j].stack;
        if (!stackName) {
        continue;
        }
        if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
            stackStart: [],
            stackEnd: []
        };
        }
        const info = stackInfo[stackName];
        const data = series[j].data[i];
        if (data && data !== '-') {
        if (info.stackStart[i] == null) {
            info.stackStart[i] = j;
        }
        info.stackEnd[i] = j;
        }
    }
    }
    for (let i = 0; i < series.length; ++i) {
    const data = series[i].data;
    const info = stackInfo[series[i].stack];
    for (let j = 0; j < series[i].data.length; ++j) {
        // const isStart = info.stackStart[j] === i;
        const isEnd = info.stackEnd[j] === i;
        const topBorder = isEnd ? 20 : 0;
        const bottomBorder = 0;
        data[j] = {
        value: data[j],
        itemStyle: {
            borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
        }
        };
    }
    }

    let globalArray = []
    function handleResultArray(resultArray)
    {   
        $('.statistics-call-duration-procent').each(function(index, item)
        {
            $(item).text(resultArray[index]);
            $(this).css('display', 'block')
        })
    }
    chartBar.on('mouseover', function()
    {
        handleResultArray(globalArray);
    })

    chartBar.on('mouseout', function(event) {
        $('.statistics-call-duration-procent').each(function(index, item) {
          if (!$(item).is(':hover')) {
            $(item).css('display', 'none');
          }
        });
      });
      
      

    optionBar = 
    {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            textStyle:
            {
                color: '#7B76FF'
            },

          },
    xAxis: {
        type: 'category',
        data: ['01.08', '02.08', '03.08', '04.08', '05.08', '06.08', '07.08', '08.08', '09.08', '08.08', '09.08'],
    },
    yAxis: {
        type: 'value'
    },
    series: series,
    width: '1280px',
    grid:
    {
        left: 0
    }
    };

    optionBar && chartBar.setOption(optionBar);


    selecetSingleTitle.addEventListener('click', () =>
    {
        if('active' === selectSingle.getAttribute('data-state'))
        {
            selectSingle.setAttribute('data-state', '');
        }
        else 
        {
            selectSingle.setAttribute('data-state', 'active');
        }
    })


    const scrollbarsConfig = 
    [
        { id: 'scrollbar-one', minSize: 120, maxSize: 120},
        { id: 'scrolbar-two', minSize: 82, maxSize: 82},
        { id: 'scrollbar-third', minSize: 52, maxSize: 52 },
        { id: 'scrollbar-fourth', minSize: 20, maxSize: 20 },
        { id: 'scrollbar-fifth', minSize: 20, maxSize: 20 },
        { id: 'scrollbar-sixth', minSize: 80, maxSize: 80 },
        { id: 'scrollbar-seventh', minSize: 39.15, maxSize: 39.15 },
        { id: 'scrollbar-eighth', minSize: 39.15, maxSize: 39.15 },
        { id: 'scrollbar-nineth', minSize: 47.71, maxSize: 47.71 },
        { id: 'scrollbar-tenth', minSize: 39.15, maxSize: 39.15 },
        { id: 'scrollbar-eleventh', minSize: 39.15, maxSize: 39.15 },
        { id: 'scrollbar-twelfth', minSize: 39.15, maxSize: 39.15 },
        { id: 'scrollbar-thirteenth', minSize: 47.71, maxSize: 47.71 },
        { id: 'scrollbar-fourteenth', minSize: 39.15, maxSize: 39.150 }
    ];

    scrollbarsConfig.forEach(config => 
    {
        let scrollbar = document.getElementById(config.id);
        new SimpleBar(scrollbar, 
            {
                wrapContent: true,
            autoHide: true,
            scrollbarMinSize: config.minSize,
            scrollbarMaxSize: config.maxSize,
            });
    });

})
$(document).ready(function()
{   

    $('body').on('click', '.statistics-item-image-filter', function(event)
    {
        event.stopPropagation();
        $('.statistics-dropdown-customize-columns').hide();
        $('.statistics-period-customize-columns').removeClass('active-show-columns');
        $('.statistics-period-liked').removeClass('active-show-liked');
        $('.statistics-dropdown-add-favorites').css('display', 'none');
       const dropdown = $(this).siblings('.hidden-dropdown')
       const isOpen = dropdown.is('div:visible');
       $('.hidden-dropdown').hide();
       if(isOpen)
       {
            return;
       }
       dropdown.show();
    })
    $('.statistics-period-customize-columns').click(function(event)
    {
        event.stopPropagation();

        $(this).toggleClass('active-show-columns');
        const dropdown = $('.statistics-dropdown-customize-columns');
        if($(this).hasClass('active-show-columns'))
        {
            dropdown.css('display', 'block');
            $('.statistics-period-liked').removeClass('active-show-liked');
            $('.statistics-dropdown-add-favorites').css('display', 'none');
            $('.hidden-dropdown').hide();
        }
        else 
        {
            dropdown.css('display', 'none');
        }
    })
    $('.statistics-dropdown-exit').click(function()
    {
        $('.statistics-period-customize-columns').removeClass('active-show-columns');
        $('.statistics-dropdown-customize-columns').css('display', 'none');
    })
    $('.statistics-period-liked').click(function(event)
    {
        event.stopPropagation();
        if($(this).hasClass('liked-favoriites'))
        {
            $(this).removeClass('liked-favoriites'); 
            $('.statistics-period-liked-svg').show();
            $('.statistics-liked-dropdown-text').text('Removed from favorites');
            $('.statistics-liked-dropdown-menu').show().css('display', 'flex');
            setTimeout(() => {
              $('.statistics-liked-dropdown-menu').hide();
            }, 2000);
        }
        else 
        {
            $(this).toggleClass('active-show-liked');
            
        }
        const dropdownLiked = $('.statistics-dropdown-add-favorites');
        if($(this).hasClass('active-show-liked'))
        {
            dropdownLiked.css('display', 'block');
            $('.statistics-dropdown-customize-columns').hide();
            $('.hidden-dropdown').hide();
            $('.statistics-period-customize-columns').removeClass('active-show-columns')
        }
        else 
        {
            dropdownLiked.css('display', 'none');
        }
    })
    $('.statistics-dropdown-favorites-exit').click(function()
    {
        $('.statistics-period-liked').removeClass('active-show-liked');
        $('.statistics-dropdown-add-favorites').css('display', 'none');
    })

    $('.statistics-dropdown-filter-exit').on('click', function()
    {
        $(this).parents('.hidden-dropdown').toggle();
    })

    $('.statistics-dropdown-filter-operators-body .statistics-dropdown-filter-operators-groups')
    .click(function accordionToggle()
    {
        let collapsibleDiv = $(this).parent().find('.statistics-dropdown-filter-operators-container-groups');
        let plusMinusIcon = $(this).find('.statistics-dropdown-filter-operators-groups-plus-minus-icon');
        if(!$(collapsibleDiv).hasClass('expand-animate'))
        {
            expand(collapsibleDiv, plusMinusIcon);
        }
        else 
        {
            collapse (collapsibleDiv, plusMinusIcon)
        }
    });
    $('.statistics-dropdown-filter-operators-body .statistics-dropdown-filter-operators-operators')
    .click(function accordionToggle()
    {
        let collapsibleDiv = $(this).parent().find('.statistics-dropdown-filter-operators-container-operators');
        let plusMinusIcon = $(this).find('.statistics-dropdown-filter-operators-plus-minus-icon');
        if(!$(collapsibleDiv).hasClass('expand-animate'))
        {
            expand(collapsibleDiv, plusMinusIcon);
        }
        else 
        {
            collapse (collapsibleDiv, plusMinusIcon)
        }
    });
    function expand(collapsibleDiv, plusMinusIcon)
    {
        $(collapsibleDiv).removeClass("collapse-animate").addClass("expand-animate");
        $(plusMinusIcon).removeClass("minus-to-plus plus").addClass("plus-to-minus minus");
    }
    
    function collapse(collapsibleDiv, plusMinusIcon) 
    {
        $(collapsibleDiv).removeClass("expand-animate").addClass("collapse-animate");
        $(plusMinusIcon).removeClass("plus-to-minus minus").addClass("minus-to-plus plus");
    }
    
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

    $('.chevron-up').on('click', function() {

        const parentDiv = $(this).parents('.parent');
        const input = parentDiv.find('.time-input')
        input.each(function(index, item)
        {
            if(item.value === '')
            {
                item.value = '01'
            }
        })
    });
    
    let targetInput = null;
    
    $('.change-value').on('click', function () 
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
            console.log('cs')
        }
    });

    $('#from-minutes, #to-minutes, #from-seconds, #to-seconds').on('focus', function() 
    {
        targetInput = (this)
        console.log(targetInput)
    });

    $(function()
    {
        $('.select-page-paginate').on('input', function()
        {
            console.log((this).value.length)
            if((this).value.length > 0)
            {
                $('.select-page-arrow').show();
                $('.statistics-select-page').css('margin-right', '65px')
            }
            else{
                $('.select-page-arrow').hide();
                $('.statistics-select-page').css('margin-right', '89px')
            }
        })
        
    });
   

    $(document).click(function(event) 
    {
        // Проверяем, был ли клик вне области выпадающего списка
        if (!$(event.target).closest('.statistics-dropdown-customize-columns').length) 
        {
            // Если клик был вне области, скрываем выпадающий список
            $('.statistics-period-customize-columns').removeClass('active-show-columns');
            $('.statistics-dropdown-customize-columns').css('display', 'none');
        }
        if (!$(event.target).closest('.statistics-dropdown-add-favorites').length) 
        {
            // Если клик был вне области, скрываем выпадающий список
            $('.statistics-period-liked').removeClass('active-show-liked');
            $('.statistics-dropdown-add-favorites').css('display', 'none');
        }
        if (!$(event.target).closest('.hidden-dropdown').length)
        {
            $('.hidden-dropdown').css('display', 'none')
        }
    });
    function autoClick()
    {
        $('.statistics-dropdown-favorites-button-save').click();
    }
    let imageURL;
    $('.statistics-dropdown-favorites-button-save').on('click', function(event)
    {
        event.preventDefault();
       if( $('.statistics-dropdown-favorites-input').val())
       {
        domtoimage.toPng(document.body, {
            quality: 100,
            filter: function(node) {
              return node.tagName !== 'SCRIPT';
            }
          }).then(function(dataUrl) {
            $('.download').attr('download', 'image.png').attr('href', dataUrl);
            imageURL = dataUrl;
          });
          $('.statistics-dropdown-add-favorites').hide();
          $('.statistics-period-liked-svg').css('display', 'none');
          $('.statistics-period-liked').removeClass('active-show-liked').addClass('liked-favoriites');
          $('.statistics-liked-dropdown-text').text('Added to favorites');
          $('.statistics-liked-dropdown-menu').show().css('display', 'flex');
          $('.statistics-liked-dropdown-menu').addClass('sticky')
          setTimeout(() => {
            $('.statistics-liked-dropdown-menu').hide();
          }, 2000);
       }
       else 
       {
         alert('Введите данные');
       }
    });

});