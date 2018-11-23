import moment from 'moment';

const dateFormatter = {
  formatAsDatetime: function (date) {
    const momentDate = moment(date);
    momentDate.locale('navigator.language || navigator.userLanguage');
    return `${momentDate.format('L')}, ${momentDate.format('LTS')}`;
  }
}

export default dateFormatter;
