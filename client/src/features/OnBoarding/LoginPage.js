import { useState } from 'react';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import { login } from './authenticationSlice'
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import constants from 'common/utils/constants';

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loader = useSelector(state => state.authentication.loader)

  const dispatch = useDispatch();

  return (
    <div className="container">
      <Form
        name="normal_login"
        className="form"
        initialValues={{
          remember: true,
        }}
        onFinish={() => dispatch(login(
          {'email': email, 'password': password },
        ))
        }
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              pattern: constants.emailPattern,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input size="large"
            prefix={<UserOutlined className="site-form-item-icon"/>}
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              pattern: constants.strongPassword,
              message: 'Please input strong Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon"/>}
            type="password"
            placeholder="Password"
            size="large"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button loading={loader} type="primary" htmlType="submit" className="login-form-button"
            size="large">Log in
          </Button>
        </Form.Item>
        <Link to="/signup" className='form-link-btn'>
          Go to Signup &nbsp;<ArrowRightOutlined />
        </Link>
      </Form>
    </div>
  );
}

export default LoginPage;
