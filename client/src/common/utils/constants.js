const constants = {
  HOST_URL: process.env.REACT_APP_HOST_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  emailPattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$',
  strongPassword: '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
};

export default constants;
