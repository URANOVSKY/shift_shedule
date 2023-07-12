console.log('________________________________________')
console.log('| А что это ты тут забыл, дружочек? :D |')
console.log('****************************************')


const Calendar = {
        data() {
            return {
            yr:  new Date().getFullYear(), // получаем значение текущего года
            spaces: [1, 2, 0, 1, 1, 2, 2, 3, 4, 4, 5, 5],
            addingSpaces: [1, 2, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6],
            months: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            // массив праздничных дней
            holidays: new Set(['1-1','1-2','1-3','1-4','1-5','1-7','2-23','3-8','5-1','5-9','6-12','11-4','12-31']),

            // эталонный год - 2023, прописывается значение сдвига по первой смене
            // относительно этого года. Все остальные значения смен свдигаются
            // относительно первой смены по правилу:
            // См.№1 +0; См.№2 +3; См.№3 +9; См.№4 +6; См.№5 +12;
            fromYear: 1980,
            yearPadding: 2,
            smCounting: [1, 1, 1, 'В', 'В', 3, 3, 3, 'В', 'В', 2, 2, 2, 'В', 'В'],
            smPadding:[0, 3, 9, 6, 12],
            // данные по доработкам
            json: {
                    "over": {
                        "year": 2023,
                        "date":[
                            {"day": "1-10", "shift": 1}, //формат mm-dd
                            {"day": "1-18", "shift": 2},
                            {"day": "1-19", "shift": 4},
                            {"day": "1-24", "shift": 5},
                            {"day": "1-27", "shift": 3}
                        ]
                    }
                }
        }
    },
    methods: {
        // метод определения високосности года
        ily()   {
             return (this.yr%400)?((this.yr%100)?((this.yr%4)?false:true):false):true; 
                },
        //вычисляем количество дней между 1 января 1980 и выбранного годв - yr, и вычисляем отступ
        daysFromYear(yr) {
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const firstDate = new Date(yr, 1, 1);
            const secondDate = new Date(this.fromYear, 1, 1);

            const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));


            return diffDays % 15 + this.yearPadding
        },
        
        //  метод проверки дня на праздничный и выходной, доработки, обучение
        checkDay(day, month) {
            if (typeof(day) == 'number') { //проверка на числовой формат значения дня
                if (this.holidays.has(month+'-'+day)) {
                    return 'hol'
                }
                var date = this.yr + "-"+ month + "-" + day
                if (new Date(date).getDay() == 0) {
                    return 'sun'
                }
                date = day + "-" + month

                // if (date in )

                }
        },
                

        // метод получения массива графика расстановки смен
        getWork()   {
            workDays = [[],[],[],[],[]]

            // прописываем номера смен
            for (let i = 0; i < 5; i++) {
                workDays[i][0] = "№" + (i + 1) 
            }

            // console.log("Отступ с начала года: "+this.daysFromYear(this.yr))

            //заполняем массив рабочими сменами
            for (let i = 0;i < 5; i++) {
                for (let j = 0; j < 37; j++) {
                    
                    workDays[i].push(this.smCounting[((j+this.daysFromYear(this.yr) + this.smPadding[i]) % 15)])
                    
                    // workDays[i].push(this.smCounting[(this.yearPadding + this.smPadding[i] + j) % 15])

                }
            }

            // console.log(workDays)
            return workDays
                    },

        // метод получения массива месяцев текущего года
        getMonths() {
            months = [[],[],[],[],[],[],[],[],[],[],[],[]]
            
            days = Calendar.data().months

            if (this.ily()) {
                days[1] = 29
                spaces = Calendar.data().addingSpaces
            }
            else {
                spaces = Calendar.data().spaces
                
            }
            
            // прописываем номера месяцев
            for (let i = 0; i < 12; i++) {
                months[i][0] = (i+1).toString()
            }

            //  прописываем отсупы
            for (let i = 0;i < spaces.length; i++) {
                for (let j = 0; j < spaces[i]; j++) {
                    months[i][j+1] = ""
                }
            }

            // заполняем дни месяцев
            for (let i = 0;i < days.length; i++) {
                for (let j = 0; j < days[i]; j++) {
                    months[i].push(j +1 )
                }
            }

            //заполняем массив пустыми ячейками
            for (let i = 0;i < 12; i++) {
                for (let j = months[i].length; j < 38; j++) {
                    months[i].push(" ")
                }
            }

            return months
                    },


        // метод перелистывания годов
        getCalendar(direction)   {
            if (direction) {
                this.yr += 1
            }
            else {
                if (this.yr > this.fromYear) {this.yr -= 1}
            }

            console.log(this.yr)
                        },
    }, 
}


    // подключение приложений
    Vue.createApp(Calendar).mount('#calendar')
    
