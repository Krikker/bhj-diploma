/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Пустой элемент');
    };
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      const incomeBtn = event.target.closest('.create-income-button');
      if (incomeBtn) {
        event.preventDefault();
        App.getModal('newIncome').open();
      }

      const expenseBtn = event.target.closest('.create-expense-button');
      if (expenseBtn) {
        event.preventDefault();
        App.getModal('newExpense').open();
      }
    });
  }
}