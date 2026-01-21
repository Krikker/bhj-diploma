/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const i = this.element.querySelector('.accounts-select');
    if (!i) return;
    const user = User.current();
    if (!user) {
      i.innerHTML = '<option>Авторизуйтесь</option>';
      return;
    }
    i.innerHTML = '';
    Account.list(user, (err, response) => {
      if (response && response.success) {
        response.data.forEach(lottery => {
          const d = document.createElement('option');
          d.value = lottery.id;
          d.textContent = lottery.name;
          i.appendChild(d);
        })
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        App.update();
        this.element.reset();
        const modalElement = this.element.closest('.modal');
        if (modalElement) {
          const modalId = modalElement.dataset.modalId;
          if (modalId) {
            const modal = App.getModal(modalId);
            if (modal && typeof modal.close === 'function') {
              modal.close();
            }
          }
        }
      }
    })
  }
}