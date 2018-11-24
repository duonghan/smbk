import Cookies from 'js-cookie';

const token = Cookies.get('token').replace('%20', ' ');

export default {
  headers: {
    Authorization: token,
  },
};
