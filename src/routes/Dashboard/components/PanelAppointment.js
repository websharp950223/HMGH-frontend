import React from 'react';
import {
  Avatar,
  Tabs,
} from 'antd';
import { FaUser } from 'react-icons/fa';
import { GiBackwardTime } from 'react-icons/gi';
import { BsEnvelope, BsXCircle, BsFillFlagFill, BsCheckCircleFill } from 'react-icons/bs';
import intl from 'react-intl-universal';
import messages from '../messages';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './index.less';
const { TabPane } = Tabs;
import moment from 'moment';
import request,{generateSearchStructure} from '../../../utils/api/request'

class PanelAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        appointments:[],
        type:0,
        currentTab: 1,
    };
  }

  getMyAppointments = (searchData)=>{
    var url  = 'clients/get_my_appointments';
    if(this.props.userRole === 30){
      url = 'providers/get_my_appointments'
    }

    request.post(url,searchData).then(result=>{
      if(result.success){
        var data = result.data;
        console.log(url,data, this.props.userRole);
        this.setState({appointments: data.docs});
      }else{
        this.setState({appointments: []});
      }
      
    })

  }


  componentDidMount() {
    this.handleTabChange(1)
    this.props.setReload(this.setReloadData);
  }

  setReloadData = () =>{
    this.handleTabChange(this.state.currentTab);
  }

  handleTabChange = (v)=>{
    var date = moment().subtract(1, 'day').valueOf();
    this.setState({appointments: [] , currentTab:v})
    

    switch(parseInt(v)){
        case 1:return this.getMyAppointments({
            "filter":{
                "status":[0,1],
                "date":{"$gte": date }
            }
        })
        case 2: return this.getMyAppointments({
            "filter":{
                "status":[-1,2]
            }
        })
        case 3: return this.getMyAppointments({
            "filter":{
                "date":{"$lte": date }
            }
        })
    }
  }

  renderItemLeft =(data)=>{
    return (
        <div className='item-left'>
                            <Avatar size={24} icon={<FaUser size={12} />} onClick={this.onShowDrawerDetail} />
                            <div className='div-service'>
                            {/* <p className='font-11 mb-0'>{
                                data.skillSet && data.skillSet.map(item => (
                                serviceType += item
                                ) )
                                }</p> */}
                            {!!data.name&&<p className='font-09 mb-0'><b>{data.name}</b></p>}
                            {!!data.provider&&<p className='font-09 mb-0'>{data.provider.name||data.provider.referredToAs}</p>}
                            {!!data.school&&<p className='font-09 mb-0'>{data.school.name}</p>}
                            </div>
                            <p className='font-11 mb-0 ml-auto mr-5'>{data.location}</p>
                            <div className='ml-auto'>
                            <p className='font-12 mb-0'>{moment(data.date).format("HH:mm:ss")}</p>
                            <p className='font-12 font-700 mb-0'>{moment(data.date).format('YYYY-MM-DD')}</p>
                            </div>
                        </div>
    );
  }

  render(){
    const { appointments } = this.state
    return (
        <Tabs defaultActiveKey="1" type="card" size='small'
        onChange={this.handleTabChange}
        >
            <TabPane tab={intl.formatMessage(messages.upcoming)} key="1">
                {
                !!appointments&&appointments.map((data,index) => {
                    
                    return (
                        <div key={index} className='list-item'>
                        {this.renderItemLeft(data)}
                        <div className='item-right'>
                            <GiBackwardTime size={19} onClick={() => { }} />
                            <BsXCircle style={{ marginTop: 4 }} size={15} onClick={() => { }} />
                        </div>
                    </div>
                    )
                    
                })
                
                }
                {(!appointments||appointments.length ==0)&&(<div key={1} className='list-item'>
                    <p style={{padding:"10px"}}>No upcoming appoiment</p>
                </div>)}
            </TabPane>
            <TabPane tab={intl.formatMessage(messages.unprocessed)} key="2">
            {!!appointments&&appointments.map((data, index) => {
                
                return (
                    <div key={index} className='list-item'>
                   {this.renderItemLeft(data)}
                    <div className='item-right'>
                        <BsFillFlagFill size={15} onClick={() => { }} />
                        <BsCheckCircleFill className='text-green500' style={{ marginTop: 4 }} size={15} onClick={() => { }} />
                    </div>
                    </div>
                )
                
            } 
            )}
            {(!appointments||appointments.length ==0)&&(<div key={1} className='list-item'>
                    <p style={{padding:"10px"}}>No unprocess appoiment</p>
                </div>)}
            </TabPane>
            <TabPane tab={intl.formatMessage(messages.past)} key="3">
            {!!appointments&&appointments.map((data, index) =>{
                
                return (
                    <div key={index} className='list-item'>
                    {this.renderItemLeft(data)}
                    <div className='item-right'>
                        <BsEnvelope size={15} onClick={() => { }} />
                        <BsFillFlagFill style={{ marginTop: 4 }} size={15} onClick={() => { }} />
                    </div>
                    </div>
                )
                
            }
            )}
            {(!appointments||appointments.length ==0)&&(<div key={1} className='list-item'>
                    <p style={{padding:"10px"}}>No past appoiment</p>
                </div>)}
            </TabPane>
        </Tabs>
    )
  }
}
const mapStateToProps = state => {
    return ({
    })
}

export default compose(connect(mapStateToProps))(PanelAppointment);
