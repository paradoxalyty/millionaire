let game = {

    // Этот метод выполняется при открытии страницы и предлагает пользователю начать игру.
    init() {
        if (confirm("Привет.\n" +
            "Вас приветствует игра Кто Хочет Стать Миллионером.\n" +
            "Нажмите OK и погрузитесь в увлекательний мир загадок.")) {
            game.run();
        } else {
            alert("Вы упустили шанс стать миллионером.");
        }
    },

    // Этот метод перебирает вопросы в цикле и на каждой итерации вызывает
    // следующий метод передавая ему каждый раз по одному вопросу,
    // а также считает количество переданных вопросов.
    run() {
        for (const prop in questions) {
            count++;
            game.checkPrompt(questions[prop], count);
        }
    },

    // Этот метод задает пользователю вопрос.
    // Если пользователь ввел правильные данные, вызывает следующий метод
    // передавая ему в качестве параметров текущий ответ и счетчик ответов.
    checkPrompt(param) {
        const currentAnswer = Number(prompt(param, "O"));
        const availableAnswers = [1, 2, 3, 4];

        if(currentAnswer === 0){
            alert("Вы упустили шанс стать миллионером.");
            throw new Error("Пользователь становил игру.");
        } else if (!availableAnswers.includes(currentAnswer)) {
            alert("Необходимо ввести 1, 2, 3 или 4, попробуйте ещё раз.");
            game.checkPrompt(param);
        } else {
            game.compare(currentAnswer, count);
        }
    },

    // Этот метод сравнивает текущий ответ с правильным ответом.
    // Если счетчик ответов равен 5, вызывает метод остановки игры.
    compare(currentAnswer, count) {
        if(currentAnswer === rightAnswers[count-1]) {
            countRightAnswers++;
            alert("Поздравляю вы ответили правильно!!! \n" +
            "Количество правильных ответов = " + countRightAnswers);
        } else {
            alert("К сожалению вы ошиблись. \n" +
            "Количество правильных ответов = " + countRightAnswers);
        }

        while(count === 5) {
            game.end();
        }
    },

    // Этот метод предлагает сыграть еще раз.
    // Если ответ положительный, обнуляет счетчики и вызывает метод начала игры.
    end() {
        if(countRightAnswers === 5) {
            while (
                confirm("ПОЗДРАВЛЯЮ ВЫ ВЫИГРАЛИ 1 000 000 $.\n" +
                    "ПРОВЕРЬТЕ ПОЖАЛУЙСТА ВАШ БАНКОВСКИЙ СЧЕТ !!!\n" +
                "\n" +
                    "Сыграем ещё ?")) {
                count = 0;
                countRightAnswers = 0;
                game.run();
            }
        } else {
            while (confirm("Вы ответили правильно на " + countRightAnswers + " вопроса.\n" +
                "\n" +
                "Сыграем ещё ?")) {
                count = 0;
                countRightAnswers = 0;
                game.run();
            }
        }
        throw new Error("Пользователь становил игру.");
    }


};

game.init();