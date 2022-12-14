import React, { Component } from 'react';
import { Row, Col, Form, Button, Calendar, Select, Switch, Divider ,Input ,Checkbox} from 'antd';
import { BsPlusCircle, BsSquare, BsDashCircle } from 'react-icons/bs';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { GoPrimitiveDot } from 'react-icons/go';
import { QuestionCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import intl from 'react-intl-universal';
import messages from '../../messages';
import messagesLogin from '../../../Login/messages';

import { connect } from 'react-redux'
import { compose } from 'redux'
import { setRegisterData } from '../../../../../redux/features/registerSlice';

import { url } from '../../../../../utils/api/baseUrl';
import axios from 'axios'

import 'moment/locale/en-au';
moment.locale('en');
const day_week = [
    intl.formatMessage(messages.sunday),
    intl.formatMessage(messages.monday),
    intl.formatMessage(messages.tuesday),
    intl.formatMessage(messages.wednesday),
    intl.formatMessage(messages.thursday),
    intl.formatMessage(messages.friday),
]

class SubsidyProgram extends Component {
    state = {
        valueCalendar: moment(),
        selectedDay: moment(),
        // currentDate: new Date(),
        // currentMonth: moment().format('MMMM YYYY'),
        isSelectTime: -1,
        SkillSet:[],
        AcademicLevel:[],
        ScreenTime:[],
        NumberOfSession:[1,2,3,4,5,6,7],
        Levels:[1,2,3,4,5,6,7,8,9,10,11,12],
        ReduceList:[],
        TimeAvailableList:[],
        isAcceptProBono:false,
        isAcceptReduceRate:false,
        isWillingOpenPrivate: false,
        avaiableTime:[],
        isSameRate:true,
        privateCalendars:[],
        
    }


    componentDidMount() {
        const {registerData} = this.props.register;
        var arrReduce = [];
        for(var i=0;i<100;i++){
            arrReduce.push( i);
        }
        var arrTime = [];
        arrTime.push(moment('2018-01-19 9:30:00 AM','YYYY-MM-DD hh:mm:ss A'))
        arrTime.push(moment('2018-01-19 10:00:00 AM','YYYY-MM-DD hh:mm:ss A'))
        arrTime.push(moment('2018-01-19 10:30:00 AM','YYYY-MM-DD hh:mm:ss A'))
        arrTime.push(moment('2018-01-19 11:00:00 AM','YYYY-MM-DD hh:mm:ss A'))

        this.setState({ReduceList: arrReduce,TimeAvailableList: arrTime});
        if (registerData.subsidy) {
            this.form?.setFieldsValue(registerData.subsidy);
            
        }else{
            this.form.setFieldsValue({reduceWithAcademic:[{}]})
        }
        this.setState({
            isAcceptProBono: registerData.isAcceptProBono||false,
            isAcceptReduceRate: registerData.isAcceptReduceRate||false,
            isWillingOpenPrivate: registerData.isWillingOpenPrivate||false
        })
        this.getDataFromServer();
    }

    getDataFromServer = () => {
        axios.post(url + 'providers/get_default_values_for_provider'
        ).then(result => {
            console.log('get_default_value_for_client', result.data);
            if (result.data.success) {
                var data = result.data.data;
                this.setState({ 
                    SkillSet:data.SkillSet,
                    AcademicLevel:data.AcademicLevel,
                    ScreenTime:data.SreenTime,
                })
            } else {
                this.setState({
                    SkillSet:[],
                    AcademicLevel:[],
                    ScreenTime:[],
                });

            }

        }).catch(err => {
            console.log(err);
            this.setState({
                SkillSet:[],
                AcademicLevel:[],
                ScreenTime:[],
            });
        })
    }

    onSelect = (newValue) => {
        this.setState({ valueCalendar: newValue });
        this.setState({ selectedDay: newValue });
    }
    onPanelChange = (newValue) => {
        this.setState({ valueCalendar: newValue });
    }
    onFinish =async (values) => {
        console.log('Success:', values);
        var privateCalendars = this.convertCalendarToArray();
        if(!!this.form.getFieldError('checkAllFields')){
            this.form.setFields([
                {
                  name: 'checkAllFields',
                  errors: [],
                },])
        }
        if(!privateCalendars||privateCalendars <1){
            this.form.setFields([
                {
                  name: 'checkAllFields',
                  errors: ['Please choose value for calendars'],
                },])
            return;
        }
        // return;
        const {registerData} = this.props.register;
        console.log('prop',registerData);

        var postData = this.copyField(registerData);
        postData.privateCalendars = privateCalendars;
        // postData.contactNumber = this.validDateContactPhoneNumber(registerData.profileInfor);
        // postData.contactEmail = this.validDataContactEmail(registerData.profileInfor);
        // 
        
        console.log(postData);
        
        const response = await axios.post(url + 'users/signup', postData);
        const { success, data } = response.data;
        if (success) {
            // this.props.onFinishRegister();
            // localStorage.setItem('token', data.token);
            this.props.onContinue(true);
            
        }else{
            message.error(error?.response?.data?.data ?? error.message);
        }
        // this.props.onContinue();
    };

    copyField = (registerData)=>{
        var arr= ["email","role","isAcceptProBono","isAcceptReduceRate","isWillingOpenPrivate","password","username"];
        var step4Data = this.validDataStep4(registerData.step4);
        var obj = {...registerData.profileInfor ,...registerData.subsidy , ...registerData.serviceInfor,...step4Data};
        for(var i = 0 ; i < arr.length ; i++){
            obj[""+arr[i]]= registerData[""+arr[i]];
        }
        obj.W9FormPath = registerData.uploaded_path;



        // var arrCopyForInfo = ['agency','billingAddress','cityConnection' , 'licenseNumber' , 'proExp', 'referredToAs', 'serviceAddress' , ];
        // for(var i = 0 ; i < arr.length ; i++){
        //     obj[""+arr[i]]= registerData.profileInfor[""+arr[i]];
        // }


        return obj;
    }

    convertCalendarToArray =()=>{
        var arr = [];
        for(var i = 0 ; i < this.state.privateCalendars.length;i++){
            arr.push({
                day: this.state.privateCalendars[i].day.valueOf(),
                availableHours: this.state.privateCalendars[i].availableHours.map((hour)=>{
                    return hour.valueOf()
                })
            })
        }
        return arr;
    }

    validDataStep4 = (step4)=>{
        var manualSchedule = [];
        console.log('step4',step4);
        for(var i = 0 ; i < day_week.length ; i++){
            
            for(var j = 0 ; j < step4[''+day_week[i]].length;j++  ){
                var scheduleItem = step4[''+day_week[i]][j];
                manualSchedule.push({
                    "location":scheduleItem.location,
                    "dayInWeek":i,
                    "openHour":scheduleItem.from_time.hour(),
                    "openMin":scheduleItem.from_time.minutes(),
                    "closeHour":scheduleItem.to_time.hour(),
                    "closeMin":scheduleItem.to_time.minutes()
                })
            }
            
        }
        return {
            cancellationFee: step4.cancellation_fee,
            cancellationWindow: step4.cancellation_window,
            manualSchedule: manualSchedule
        }
    }

    validDataContactEmail = (profileInfor)=>{
        // contact: {email: '123@gmail.com'}
        // contact_email: {type: 1}
        var arr = [];
        for(var i = 0 ; i < profileInfor.contactEmail.length ; i++){
            arr.push({
                "email": profileInfor.contactEmail[i].contact.email,
                "type":profileInfor.contactEmail[i].contact_email.type
            })
        }
    }

    validDateContactPhoneNumber = (profileInfor)=>{
        var arr= [];
        for(var i = 0 ; i < profileInfor.contactNumber.length ; i++){
            console.log(profileInfor.contactNumber[i].contact , profileInfor.contactNumber[i].contact.contactphone )
            arr.push({"phoneNumber": profileInfor.contactNumber[i].contact.phoneNumber,
            "type": profileInfor.contactNumber[i].contact.contactphone.type
            });
        }
        return arr;
        // contact: {phoneNumber: '123123123124'}
        // contactphone: {type: 3}
    }

    validDataServiceInfor(serviceInfor){
        
    }



    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    nextMonth = () => {
        this.setState({ selectedDay: moment(this.state.selectedDay).add(1, 'month') });
        this.setState({ valueCalendar: moment(this.state.selectedDay).add(1, 'month') });
    }
    prevMonth = () => {
        this.setState({ selectedDay: moment(this.state.selectedDay).add(-1, 'month') });
        this.setState({ valueCalendar: moment(this.state.selectedDay).add(-1, 'month') });
    }
    onSelectTime = (index) => {
        this.setState({ isSelectTime: index })
    }


    defaultOnValueChange = (event, fieldName) => {
        console.log(this.form.getFieldsValue())
    }

    changeCheckboxValueOnRedux = (name , value)=>{
        var obj = {};
        obj[name] = value;
        this.props.setRegisterData(obj)
    }

    handleSelectChange = (value, fieldName) => {
        console.log(this.form.getFieldsValue())
        this.props.setRegisterData({subsidy:this.form.getFieldsValue()})
        
    }


    addOrRemovePrivateCalendar =(day , hour)=>{
        var isExist = -1;
        for(var i = 0 ; i < this.state.privateCalendars.length ; i++){
            if(this.state.privateCalendars[i].day.format('yyyy mm dd') == day.format('yyyy mm dd')){
                isExist = i;
            }
        }
        
        let arr = [...this.state.privateCalendars];
        if(isExist>=0){
            if(arr[isExist].availableHours.indexOf(hour)>=0){ // remove
                arr[isExist].availableHours.splice( arr[isExist].availableHours.indexOf(hour) , 1);
                if(arr[isExist].availableHours.length == 0){
                    arr.splice(isExist,1)
                }
            }else{
                arr[isExist].availableHours.push(hour);
            }
        }else{
            arr.push({day:day , availableHours:[hour]})
        }
        console.log(arr);
        this.setState({privateCalendars:arr})
    }

    checkDateExist(day){
        var isExist = -1;
        for(var i = 0 ; i < this.state.privateCalendars.length ; i++){
            if(this.state.privateCalendars[i].day.format('yyyy mm dd') == day.format('yyyy mm dd')){
                isExist = i;return true;
            }
        }
        return false;
    }

    checkHourExist(hour){
        var isExist = -1;
        var day = this.state.selectedDay;
        for(var i = 0 ; i < this.state.privateCalendars.length ; i++){
            if(this.state.privateCalendars[i].day.format('yyyy mm dd') == day.format('yyyy mm dd')){
                isExist = i;break;
            }
        }
        let arr = this.state.privateCalendars;
        if(isExist>=0){
            if(arr[isExist].availableHours.indexOf(hour)>=0){ // remove
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }


    render() {
        const { valueCalendar, selectedDay, isSelectTime } = this.state;
        return (
            <Row justify="center" className="row-form">
                <div className='col-form col-subsidy-program'>
                    <div className='div-form-title'>
                        <p className='font-30 text-center mb-10'>{intl.formatMessage(messages.subsidyProgram)}<QuestionCircleOutlined className='text-primary icon-question ' /></p>
                    </div>
                    <Form
                        name="form_subsidy_program"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        // initialValues={{
                        //     level: this.state.levels,
                        // }}
                        ref={(ref) => { this.form = ref }}
                    >
                        <div className='flex flex-row mb-10'>
                            {/* <BsSquare size={11} /> */}
                            <Checkbox 
                            checked={this.state.isAcceptProBono} 
                            
                            onChange={v=>{
                                console.log('checked change',v)
                                this.setState({ isAcceptProBono: v.target.checked})
                                this.changeCheckboxValueOnRedux('isAcceptProBono',v.target.checked )
                            }}
                            />
                            <p className='font-15 font-700 mb-0 ml-10'>{intl.formatMessage(messages.offeringVolunteer)}</p>
                        </div>
                        <div className='flex flex-row justify-between px-20'>
                            <p className='mb-10'>{intl.formatMessage(messages.numberSessionsWeek)}</p>
                            <Form.Item
                                name="numberSessions"
                                className='select-small'
                            >
                                <Select 
                                disabled={!this.state.isAcceptProBono}

                                onChange={v=>this.handleSelectChange(v,'numberSessions')}>
                                    {this.state.NumberOfSession.map((value)=>{
                                        return (<Select.Option value={value}>{value}</Select.Option>)
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                        <Divider style={{ marginTop: 10, borderColor: '#d7d7d7' }} />
                        <div className='flex flex-row mb-10'>
                            {/* <BsSquare size={11} /> */}
                            <Checkbox 
                            onChange={v=>{
                                console.log('checked change',v)
                                this.setState({ isAcceptReduceRate: v.target.checked})
                                this.changeCheckboxValueOnRedux('isAcceptReduceRate',v.target.checked )
                            }}
                            checked={this.state.isAcceptReduceRate} />
                            <p className='font-15 font-700 mb-0 ml-10'>{intl.formatMessage(messages.provideSubsidizedCases)}</p>
                        </div>
                        <div className='px-20'>
                            <p className='mb-10'>{intl.formatMessage(messages.academicLevel)}</p>
                            <Form.List name="reduceWithAcademic">
                                {(fields, { add, remove }) => (
                                    <div className='div-time'>
                                        {fields.map((field) => {
                                            return (
                                                <Row key={field.key} gutter={10}>
                                                    <Col xs={24} sm={24} md={12}>
                                                        <Form.Item
                                                            name={[field.name, "level"]}
                                                            className='select-small'
                                                            rules={[{ required: !this.state.isAcceptReduceRate, message: intl.formatMessage(messagesLogin.pleaseEnter) + ' ' + intl.formatMessage(messages.level) }]}
                                                        >
                                                            <Select 
                                                            disabled={!this.state.isAcceptReduceRate}
                                                            onChange={v=>{
                                                                console.log('on field change')
                                                                this.handleSelectChange();
                                                            }}
                                                            placeholder={intl.formatMessage(messages.level)}>
                                                                {this.state.Levels.map((lvl)=>{
                                                                    return (<Select.Option value={lvl}>Grade {lvl}</Select.Option>)
                                                                })}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={12} sm={12} md={6}>
                                                        <Form.Item
                                                            name={[field.name, "rate"]}
                                                            className='select-small'
                                                            style={{height:"25px !important"}}
                                                            rules={[{ required: !this.state.isAcceptReduceRate, message: intl.formatMessage(messagesLogin.pleaseEnter) + ' ' + intl.formatMessage(messages.rate) }]}
                                                        >
                                                            <Input
                                                            onChange={v=>{
                                                                console.log('on field change' , v)
                                                                if(this.state.isSameRate){
                                                                    console.log(this.form.getFieldsValue());
                                                                    var arr = JSON.parse(JSON.stringify( this.form.getFieldValue('reduceWithAcademic')));
                                                                    for(var i = 0 ; i < arr.length ; i++){
                                                                        if(arr[i]==undefined) arr[i]={}
                                                                        arr[i].rate = v.target.value;
                                                                    }
                                                                    this.form.setFieldValue('reduceWithAcademic',arr);
                                                                }
                                                                
                                                            }}
                                                            disabled={!this.state.isAcceptReduceRate}
                                                             className='input-with-select-small' placeholder={intl.formatMessage(messages.rate)} />
                                                            {/* <Select placeholder={intl.formatMessage(messages.rate)}>
                                                                <Select.Option value='r1'>rate 1</Select.Option>
                                                                <Select.Option value='r2'>rate 2</Select.Option>
                                                            </Select> */}
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={12} sm={12} md={6} className={field.key !== 0 && 'item-remove'}>
                                                        <Form.Item
                                                            name={[field.name, "reduced"]}
                                                            className='select-small'
                                                            rules={[{ required: !this.state.isAcceptReduceRate, message: intl.formatMessage(messagesLogin.pleaseEnter) + ' ' + intl.formatMessage(messages.reduced) }]}
                                                        >
                                                            <Select 
                                                            onChange={v=>{
                                                                console.log('on field change')
                                                                this.handleSelectChange();
                                                            }}
                                                            disabled={!this.state.isAcceptReduceRate}
                                                            placeholder={intl.formatMessage(messages.reduced)}>
                                                                {this.state.ReduceList.map(value=>{
                                                                    return <Select.Option value={value}>{value} %</Select.Option>
                                                                })}
                                                            </Select>
                                                        </Form.Item>
                                                        {field.key !== 0 && <BsDashCircle size={16} className='text-red icon-remove' onClick={() => remove(field.name)} />}
                                                    </Col>
                                                </Row>

                                            );
                                        }
                                        )}
                                        <Row>
                                            <Col span={8}>
                                                <div className='flex flex-row'>
                                                    <BsPlusCircle 
                                                    disabled={!this.state.isAcceptReduceRate}
                                                    size={14} className='mr-5 text-primary' />
                                                    <a className='text-primary' 
                                                    disabled={!this.state.isAcceptReduceRate}
                                                    onClick={() => {
                                                        add()
                                                    }}>{intl.formatMessage(messages.addLevel)}</a>
                                                </div>
                                            </Col>
                                            <Col span={16}>
                                                <div className='flex flex-row items-center justify-end'>
                                                    <Switch 
                                                    onChange={v=>this.setState({isSameRate:v})}
                                                    disabled={!this.state.isAcceptReduceRate}
                                                    size="small" defaultChecked />
                                                    <p className='ml-10 mb-0'>{intl.formatMessage(messages.sameRateLevels)}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                            </Form.List>


                        </div>

                        <Divider style={{ borderColor: '#d7d7d7' }} />
                        <div className='flex flex-row mb-10'>
                            {/* <BsSquare size={11} /> */}
                            <Checkbox 
                            onChange={v=>{
                                console.log('checked change',v)
                                this.setState({ isWillingOpenPrivate: v.target.checked})
                                this.changeCheckboxValueOnRedux('isWillingOpenPrivate',v.target.checked )
                            }}
                            checked={this.state.isWillingOpenPrivate} />
                            
                            <p className='font-15 font-700 mb-0 ml-10'>{intl.formatMessage(messages.openPrivateSlots)}</p>
                        </div>
                        <div className='px-20'>
                            <p className='font-700'>{intl.formatMessage(messages.selectDateTime)}</p>
                            <div className='calendar'>
                                <Row gutter={15}>
                                    <Col xs={24} sm={24} md={15}>
                                        <Calendar
                                            fullscreen={false}
                                            value={valueCalendar}
                                            onSelect={this.onSelect}
                                            onPanelChange={this.onPanelChange}
                                            dateCellRender={(date)=>{
                                                if(this.checkDateExist(date)){
                                                    console.log('checked true')
                                                    return <div
                                                    className='mydaterender'
                                                    >{date.day}</div>
                                                }
                                                // console.log(date);
                                                // .mydaterender {
                                                //     background-color: @blue05;
                                                //   }
                                                //   .mydaterenderselecting {
                                                //     background-color: @bluelight550;
                                                //   }
                                                //   .mydaterendernothing {
                                                //     background-color: @white;
                                                //   }
                                            }}
                                            headerRender={() => {
                                                return (
                                                    <div style={{ marginBottom: 10 }}>
                                                        <Row gutter={8} justify="space-between" align="middle">
                                                            <Col>
                                                                <p className='font-16 mb-0'>{selectedDay?.format('MMMM YYYY')}</p>
                                                            </Col>
                                                            <Col>
                                                                <Button
                                                                    type='text'
                                                                    className='mr-10 left-btn'
                                                                    icon={<BiChevronLeft size={25} />}
                                                                    onClick={this.prevMonth}
                                                                />
                                                                <Button
                                                                    type='text'
                                                                    className='right-btn'
                                                                    icon={<BiChevronRight size={25} />}
                                                                    onClick={this.nextMonth}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                );
                                            }}
                                        />
                                    </Col>
                                    <Col xs={24} sm={24} md={9} style={{height:'200px'}}>
                                        <p className='font-16'>{selectedDay?.format('dddd MMMM DD ')}</p>
                                        <div className='time-available-title'>
                                            <p className='font-12 mb-0'><GoPrimitiveDot size={15} />{intl.formatMessage(messages.timesAvailable)}</p>
                                        </div>
                                        {this.state.TimeAvailableList.map((timeItem, index) => <div key={index} 
                                        className= 'time-available'
                                        // className={isSelectTime === index ? 'time-available active' : 'time-available'} 
                                        onClick={() => this.addOrRemovePrivateCalendar(selectedDay ,timeItem)}>
                                            <p className='font-12 mb-0'>{this.checkHourExist(timeItem)&&<GoPrimitiveDot size={15} />}{timeItem.format('hh:mm A')}</p>
                                        </div>)}
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <Form.Item 
                        name="checkAllFields"
                        className="form-btn continue-btn" >
                            <Button
                                block
                                type="primary"
                                htmlType="submit"
                            // onClick={this.props.onContinueProgram}
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

const mapStateToProps = state => ({
    register: state.register,
})
export default compose(connect(mapStateToProps, { setRegisterData }))(SubsidyProgram);