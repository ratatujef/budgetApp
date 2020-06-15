"use strict()";

let startBtn = document.getElementById("start"),
  budgetValue = document.getElementsByClassName("budget-value")[0],
  dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
  levelValue = document.getElementsByClassName("level-value")[0],
  expensesValue = document.getElementsByClassName("expenses-value")[0],
  optionalExpensesValue = document.getElementsByClassName(
    "optionalexpenses-value"
  )[0],
  incomeValue = document.getElementsByClassName("income-value")[0],
  monthSavingsValue = document.getElementsByClassName("monthsavings-value")[0],
  yearSavingsValue = document.getElementsByClassName("yearsavings-value")[0],
  //
  expensesItem = document.getElementsByClassName("expenses-item"),
  approveExpensesBtn = document.getElementsByTagName("button")[0],
  approveOptionaExpensesBtn = document.getElementsByTagName("button")[1],
  countBudgetBtn = document.getElementsByTagName("button")[2],
  optionalExpensesItem = document.querySelectorAll(".optionalexpenses-item"),
  optionalIncome = document.querySelector(".choose-income"),
  checkSavings = document.querySelector("#savings"),
  capital = document.querySelector(".choose-sum"),
  percent = document.querySelector(".choose-percent"),
  year = document.querySelector(".year-value"),
  month = document.querySelector(".month-value"),
  day = document.querySelector(".day-value");

let money, time, expensesSum;
approveExpensesBtn.disabled = true;
countBudgetBtn.disabled = true;
approveOptionaExpensesBtn.disabled = true;

startBtn.addEventListener("click", function () {
  time = prompt("Введите дату в формате YYYY-MM-DD");
  money = +prompt("Ваш бюджет на месяц?");
  while (isNaN(money) || money == "" || money == null) {
    money = +prompt("Ваш бюджет на месяц?");
  }
  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  year.value = new Date(Date.parse(time)).getFullYear();
  month.value = new Date(Date.parse(time)).getMonth() + 1;
  day.value = new Date(Date.parse(time)).getDate();
  approveExpensesBtn.disabled = false;
  countBudgetBtn.disabled = false;
  approveOptionaExpensesBtn.disabled = false;
});
approveExpensesBtn.addEventListener("click", function () {
  let summ = 0;
  for (let i = 0; i < expensesItem.length; i++) {
    let a = expensesItem[i].value,
      b = expensesItem[++i].value;

    if (
      typeof a === "string" &&
      typeof a != null &&
      typeof b != null &&
      a != "" &&
      b != "" &&
      a.length < 50
    ) {
      console.log("Done");
      appData.expenses[a] = b;
      summ += +b;
    } else {
      console.log("Bad Data");
      i--;
    }
  }
  expensesValue.textContent = summ;
  expensesSum = summ;
});
approveOptionaExpensesBtn.addEventListener("click", function () {
  for (let i = 0; i < optionalExpensesItem.length; i++) {
    let opt = optionalExpensesItem[i].value;
    optionalExpensesValue.textContent += opt + " ";
  }
});
countBudgetBtn.addEventListener("click", function () {
  if (appData.budget != undefined) {
    appData.moneyPerDay = ((appData.budget - expensesSum) / 30).toFixed(2);
    dayBudgetValue.textContent = appData.moneyPerDay;
    if (appData.moneyPerDay < 1000) {
      levelValue.textContent = "Достаток ниже среднего";
    } else if (appData.moneyPerDay < 5000 && appData.moneyPerDay > 1000) {
      levelValue.textContent = "Средний достаток";
    } else {
      levelValue.textContent = "Состоятельный";
    }
  } else {
    dayBudgetValue.textContent = "Произошла ошибка!";
    levelValue.textContent = 'нажмите кнопку "Начать Расчет"';
  }
});
optionalIncome.addEventListener("input", function () {
  let item = optionalIncome.value;
  if (typeof item === "string" && item != "" && item != null) {
    appData.income = item.split(",");
    incomeValue.textContent = item;
  }
});
checkSavings.addEventListener("click", function () {
  if (appData.savings == false) {
    appData.savings = true;
  } else {
    appData.savings = false;
  }
});
capital.addEventListener("input", () => {
  if (appData.savings == true) {
    let summ = +capital.value,
      perc = +percent.value;
    if (isNaN(perc) == true || isNaN(summ) == true) {
      monthSavingsValue.textContent = "Введите правильное значение";
      yearSavingsValue.textContent = "Введите правильное значение";
    } else {
      appData.monthIncome = ((summ / 12 / 100) * perc).toFixed(2);
      appData.yearIncome = ((summ / 100) * perc).toFixed(2);
      monthSavingsValue.textContent = appData.monthIncome;
      yearSavingsValue.textContent = appData.yearIncome;
    }
  }
});
percent.addEventListener("input", () => {
  if (appData.savings == true) {
    let summ = +capital.value,
      perc = +percent.value;
    if (isNaN(perc) == true || isNaN(summ) == true) {
      monthSavingsValue.textContent = "Введите правильное значение";
      yearSavingsValue.textContent = "Введите правильное значение";
    } else {
      appData.monthIncome = ((summ / 12 / 100) * perc).toFixed(2);
      appData.yearIncome = ((summ / 100) * perc).toFixed(2);
      monthSavingsValue.textContent = appData.monthIncome;
      yearSavingsValue.textContent = appData.yearIncome;
    }
  }
});

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};

//   getOptExpenses: function () {
//     for (i = 0; i < 3; i++) {
//       let a = prompt("Введите необязательную статью расходов"),
//         b = +prompt("Сколько это стоит?");
//       while (isNaN(b) || b == "" || b == null) {
//         b = +prompt("Сколько это стоит?");
//       }

//       if (
//         typeof a === "string" &&
//         typeof a != null &&
//         a != "" &&
//         a.length > 2 &&
//         a != "" &&
//         a.length < 50
//       ) {
//         appData.optionalExpenses[a] = b;
//         console.log("optExpenses complited");
//       } else {
//         console.log("Bad data of optional expenses");
//         i--;
//       }
//     }
//   },
// };

// appData.income.forEach(function (item, index) {
//   alert("Способы доп. заработка: " + (index + 1) + " - " + item);
// });
// for (let key in appData) {
//   console.log("Наша программа включает в себя даннные " + key + "");
// }
