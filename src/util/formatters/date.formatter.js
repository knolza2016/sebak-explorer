import moment from 'moment';

export {
  formatAsDatetime,
  formatAsTimeAgo
}

function formatAsDatetime(date) {
  const momentDate = moment(date);
  momentDate.locale('navigator.language || navigator.userLanguage');
  return `${momentDate.format('L')}, ${momentDate.format('LTS')}`;
}

function formatAsTimeAgo(date) {
  if (date) {
    return moment(date).fromNow()
  }
}
