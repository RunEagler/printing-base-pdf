import { Form, Input } from 'antd';
import { Radio } from 'antd';
import { Const } from '@/constants/Const';

const ControlForm = () => {
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      className="p-20"
      style={{ padding: '20px' }}
      scrollToFirstError
    >
      <Form.Item name="layoutType" label="LayoutType">
        <Radio.Group defaultValue={Const.LayoutType.One}>
          {[
            Const.LayoutType.One,
            Const.LayoutType.Two,
            Const.LayoutType.Three,
            Const.LayoutType.Four,
            Const.LayoutType.Five,
            Const.LayoutType.Six,
          ].map((layoutType) => (
            <Radio.Button value={layoutType} key={layoutType}>
              {layoutType}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item name="title" label="title" hasFeedback>
        <Input />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

export default ControlForm;
