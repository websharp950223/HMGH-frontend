import React,  {Component} from 'react';
import { Row, Col, Form, Button, Input, Select } from 'antd';
import { BsPlusCircle } from 'react-icons/bs';
import intl from 'react-intl-universal';
import messages from '../../messages';
import messagesLogin from '../../../Login/messages';
class InfoProfile extends Component {
    onFinish = (values) => {
        console.log('Success:', values);
      };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    render() {
        return (
            <Row justify="center" className="row-form">
                <div className='col-form col-info-parent'>
                <div className='div-form-title'>
                    <p className='font-30 text-center mb-10'>{intl.formatMessage(messages.tellYourself)}</p>
                </div>
                <Form 
                    name="form_profile_provider"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        name="legal_name"
                        rules={[{ required: true, message: intl.formatMessage(messagesLogin.pleaseEnter) + ' ' + intl.formatMessage(messages.legalName) }]}
                    >
                        <Input placeholder={intl.formatMessage(messages.legalName)}/>
                    </Form.Item>
                    <Form.Item
                        name="referred_as"
                        rules={[{ required: true, message: intl.formatMessage(messagesLogin.pleaseEnter) + ' ' + intl.formatMessage(messages.referredAs) }]}
                    >
                        <Input placeholder={intl.formatMessage(messages.referredAs)}/>
                    </Form.Item>
                    <Form.Item name="service_address">
                        <Select placeholder={intl.formatMessage(messages.serviceAddress)}>
                            <Select.Option value='a1'>address 1</Select.Option>
                            <Select.Option value='a2'>address 2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="billing_address">
                        <Select placeholder={intl.formatMessage(messages.billingAddress)}>
                            <Select.Option value='a1'>address 1</Select.Option>
                            <Select.Option value='a2'>address 2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="city_connections">
                        <Select placeholder={intl.formatMessage(messages.cityConnections)}>
                            <Select.Option value='c1'>city 1</Select.Option>
                            <Select.Option value='c2'>city 2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="license_num"
                        rules={[{ required: true, message: intl.formatMessage(messagesLogin.pleaseEnter) + ' ' + intl.formatMessage(messages.licenseNumber) }]}
                    >
                        <Input placeholder={intl.formatMessage(messages.licenseNumber)}/>
                    </Form.Item>
                    <Form.Item
                        name="agency"
                        rules={[{ required: true, message: intl.formatMessage(messagesLogin.pleaseEnter) + ' ' + intl.formatMessage(messages.agency) }]}
                    >
                        <Input placeholder={intl.formatMessage(messages.agency)}/>
                    </Form.Item>
                    
                    <Row gutter={14}>
                        <Col xs={16} sm={16} md={16}>
                            <Form.Item
                                name="contact_num"
                                className='bottom-0'
                                rules={[{ required: true, message: intl.formatMessage(messagesLogin.pleaseEnter) + ' ' + intl.formatMessage(messages.contactNumber) }]}
                            >
                                <Input placeholder={intl.formatMessage(messages.contactNumber)}/>
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8}>
                            <Form.Item name="type" className='bottom-0'>
                                <Select placeholder={intl.formatMessage(messages.type)}>
                                    <Select.Option value='t1'>type 1</Select.Option>
                                    <Select.Option value='t2'>type 2</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className='text-center'>
                        <Button
                            type="text" 
                            className='add-number-btn mb-10'     
                            icon={<BsPlusCircle size={17} className='mr-5'/>}                                
                        >
                            {intl.formatMessage(messages.addNumber)}
                        </Button>
                    </div>
                    
                    <Row gutter={14}>
                        <Col xs={16} sm={16} md={16}>
                            <Form.Item
                                name="contact_email"
                                className='bottom-0'
                                rules={[{ required: true, message: intl.formatMessage(messagesLogin.pleaseEnter) + ' ' + intl.formatMessage(messages.contactEmail) }]}
                            >
                                <Input placeholder={intl.formatMessage(messages.contactEmail)}/>
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8}>
                            <Form.Item name="type" className='bottom-0'>
                                <Select placeholder={intl.formatMessage(messages.type)}>
                                    <Select.Option value='t1'>type 1</Select.Option>
                                    <Select.Option value='t2'>type 2</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className='text-center'>
                        <Button
                            type="text" 
                            className='add-email-btn mb-10'     
                            icon={<BsPlusCircle size={17} className='mr-5'/>}                                
                        >
                            {intl.formatMessage(messages.addEmail)}
                        </Button>
                    </div>

                    <Form.Item
                        name="professional_exp"
                        rules={[{ required: true, message: intl.formatMessage(messagesLogin.pleaseEnter) + ' ' + intl.formatMessage(messages.professionalExperience) }]}
                    >
                        <Input.TextArea rows={4} placeholder={intl.formatMessage(messages.professionalExperience)}/>
                    </Form.Item>
                    
                    <Form.Item className="form-btn continue-btn" >
                        <Button
                            block
                            type="primary"                                      
                            htmlType="submit"
                            onClick={this.props.onContinueProfile}
                        >
                            {intl.formatMessage(messages.continue).toUpperCase()}
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </Row>
        );
    }
}
export default InfoProfile;