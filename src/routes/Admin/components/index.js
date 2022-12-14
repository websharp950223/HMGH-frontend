import React from 'react';
import { connect } from 'dva';
import {
  Collapse,
  Badge,
  Avatar,
  Tabs,
  Dropdown,
  Menu,
  Button,
  Segmented,
  Row,
  Col,
  Checkbox,
  Select,
  message
} from 'antd';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import { GiBackwardTime } from 'react-icons/gi';
import { MdFormatAlignLeft } from 'react-icons/md';
import { BsEnvelope, BsFilter, BsXCircle, BsX, BsFillDashSquareFill, BsFillPlusSquareFill, BsClockHistory, BsFillFlagFill, BsCheckCircleFill } from 'react-icons/bs';
import { ModalNewAppointment, ModalSubsidyProgress } from '../../../components/Modal';
import CSSAnimate from '../../../components/CSSAnimate';
import DrawerDetail from '../../../components/DrawerDetail';
import DrawerDetailPost from '../../../components/DrawerDetailPost';
import intl from 'react-intl-universal';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from '@fullcalendar/list';

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import events from "../../../utils/calendar/events";
import msgDashboard from '../../Dashboard/messages';
import msgCreateAccount from '../../Sign/CreateAccount/messages';
import EventDetail from './EventDetail';
import './index.less';
import { routerLinks } from '../../constant';
import { checkPermission } from '../../../utils/auth/checkPermission';
const { Panel } = Collapse;
const { TabPane } = Tabs;
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilter: false,
      visibleDetail: false,
      visibleDetailPost: false,
      visibleNewAppoint: false,
      visibleSubsidy: false,
      isEventDetail: false,
      isMonth: 1,
      isGridDayView: 'Grid',

      canDrop: true,
      calendarWeekends: true,
      calendarEvents: [
        // initial event data
        { title: "Event Now", start: new Date(), allDay: true }
      ],
    }
  }
  calendarRef = React.createRef();

  componentDidMount(){
    if(!!localStorage.getItem('token')&&localStorage.getItem('token').length >0){
      checkPermission().then(loginData=>{
        console.log('login data',loginData);
        loginData.user.role < 900 && this.props.history.push(routerLinks.Dashboard)
        this.setState({userRole:loginData.user.role  })
      }).catch(err=>{
        this.props.history.push('/');
      })
    }else{
      this.props.history.push('/');
    }
  }

  onShowFilter = () => {
    this.setState({ isFilter: !this.state.isFilter });
  }

  onShowDrawerDetail = () => {
    this.setState({ visibleDetail: true });
  };

  onCloseDrawerDetail = () => {
    this.setState({ visibleDetail: false });
  };

  onShowDrawerDetailPost = () => {
    this.setState({ visibleDetailPost: true });
  };

  onCloseDrawerDetailPost = () => {
    this.setState({ visibleDetailPost: false });
  };

  onShowModalNewAppoint = () => {
    this.setState({ visibleNewAppoint: true });
  };

  onCloseModalNewAppoint = () => {
    this.setState({ visibleNewAppoint: false });
  };
  onSubmitModalNewAppoint = () => {
    this.setState({ visibleNewAppoint: false });
    message.success({
      content: intl.formatMessage(msgDashboard.appointmentScheduled),
      className: 'popup-scheduled',
    });
  };
  onShowModalSubsidy = () => {
    this.setState({ visibleSubsidy: true });
  };

  onCloseModalSubsidy = () => {
    this.setState({ visibleSubsidy: false });
  };

  handleDateClick = arg => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: "New Event",
          start: arg.date,
          allDay: arg.allDay
        })
      });
    }
  };

  handleMonthToWeek = () => {
    if (this.state.isMonth === 1) {
      this.setState({ isMonth: 0 });
    } else {
      this.setState({ isMonth: 1 });
    }
  }

  handleChangeDayView = () => {
    if (this.state.isGridDayView === 'Grid') {
      this.setState({ isGridDayView: 'List' });
    } else {
      this.setState({ isGridDayView: 'Grid' });
    }
  }

  handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar
    let title = prompt('Please enter a new title for your event')

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({ // will render immediately. will call handleEventAdd
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }, true) // temporary=true, will get overwritten when reducer gives new events
    }
  }
  handleEventClick = () => {
    this.setState({ isEventDetail: !this.state.isEventDetail });
  }
  handleEventAdd = (addInfo) => {
    this.props.createEvent(addInfo.event.toPlainObject())
      .catch(() => {
        reportNetworkError()
        addInfo.revert()
      })
  }

  handleEventChange = (changeInfo) => {
    this.props.updateEvent(changeInfo.event.toPlainObject())
      .catch(() => {
        reportNetworkError()
        changeInfo.revert()
      })
  }

  handleEventRemove = (removeInfo) => {
    this.props.deleteEvent(removeInfo.event.id)
      .catch(() => {
        reportNetworkError()
        removeInfo.revert()
      })
  }

  render() {
    const {
      isFilter,
      visibleDetail,
      visibleDetailPost,
      visibleNewAppoint,
      visibleSubsidy,
      isEventDetail,
      isMonth,
      isGridDayView
    } = this.state;
    const genExtraTime = () => (
      <BsClockHistory
        size={18}
        onClick={() => { }}
      />
    );
    const genExtraFlag = () => (
      <Badge size="small" count={2}>
        <BsFillFlagFill
          size={18}
          onClick={() => { }}
        />
      </Badge>
    );
    const btnMonthToWeek = (
      <Button className='btn-type' onClick={this.handleMonthToWeek}>
        {isMonth ? intl.formatMessage(msgDashboard.month) : intl.formatMessage(msgDashboard.week)}
      </Button>
    );
    const btnChangeDayView = (
      <Segmented
        onChange={this.handleChangeDayView}
        options={[
          {
            value: 'Grid',
            icon: <FaCalendarAlt size={18} />,
          },
          {
            value: 'List',
            icon: <MdFormatAlignLeft size={20} />,
          },
        ]}
      />
    );
    const btnFilter = (
      <div className='header-left flex flex-row' onClick={this.onShowFilter}>
        <p className='font-15'>{intl.formatMessage(msgDashboard.filterOptions)} {isFilter ? <BsX size={30} /> : <BsFilter size={25} />}</p>
      </div>
    );
    const menu = (
      <Menu
        items={[
          {
            key: '1',
            label: (<a target="_blank" rel="noopener noreferrer" onClick={this.onShowModalNewAppoint}>{intl.formatMessage(msgDashboard.session)}</a>),
          },
          {
            key: '2',
            label: (<a target="_blank" rel="noopener noreferrer" href="#">{intl.formatMessage(msgDashboard.evaluation)}</a>),
          },
          {
            key: '3',
            label: (<a target="_blank" rel="noopener noreferrer" href="#">{intl.formatMessage(msgDashboard.referral)}</a>),
          },
        ]}
      />
    );

    const optionsEvent = [
      {
        label: intl.formatMessage(msgDashboard.appointments),
        value: 'appointments',
      },
      {
        label: intl.formatMessage(msgDashboard.evaluations),
        value: 'evaluations',
      },
      {
        label: intl.formatMessage(msgDashboard.screenings),
        value: 'screenings',
      },
      {
        label: intl.formatMessage(msgDashboard.referrals),
        value: 'referrals',
      },
    ];
    const optionsSkillset = [
      {
        label: 'Kriah Tutoring' + '(46)',
        value: 'appointments',
      },
      {
        label: intl.formatMessage(msgDashboard.evaluations),
        value: 'evaluations',
      },
      {
        label: intl.formatMessage(msgDashboard.screenings),
        value: 'screenings',
      },
      {
        label: intl.formatMessage(msgDashboard.referrals),
        value: 'referrals',
      },
      {
        label: intl.formatMessage(msgDashboard.homeworkTutoring),
        value: 'home_work',
      },
      {
        label: 'OT',
        value: 'OT',
      },
      {
        label: intl.formatMessage(msgDashboard.evaluations),
        value: 'evaluations2',
      },
      {
        label: intl.formatMessage(msgDashboard.screenings),
        value: 'screenings2',
      },
      {
        label: intl.formatMessage(msgDashboard.referrals),
        value: 'referrals2',
      },
    ];
    const modalNewAppointProps = {
      visible: visibleNewAppoint,
      onSubmit: this.onSubmitModalNewAppoint,
      onCancel: this.onCloseModalNewAppoint,
    };
    const modalSubsidyProps = {
      visible: visibleSubsidy,
      onSubmit: this.onCloseModalSubsidy,
      onCancel: this.onCloseModalSubsidy,
    };
    return (
      <div className="full-layout page admin-page">
        <div className='div-show-subsidy' onClick={this.onShowModalSubsidy} />
        <div className='div-content'>
          <section className='div-calendar box-card'>
            {isFilter && <div className='calendar-filter'>
              <CSSAnimate className="animated-shorter" type={isFilter ? 'fadeIn' : 'fadeOut'}>
                <Row gutter={10}>
                  <Col xs={12} sm={12} md={4}>
                    <p className='font-10 font-700 mb-5'>{intl.formatMessage(msgDashboard.eventType)}</p>
                    <Checkbox.Group options={optionsEvent} />
                  </Col>
                  <Col xs={12} sm={12} md={6} className='skillset-checkbox'>
                    <p className='font-10 font-700 mb-5'>{intl.formatMessage(msgCreateAccount.skillsets)}</p>
                    <Checkbox.Group options={optionsSkillset} />
                  </Col>
                  <Col xs={12} sm={12} md={7} className='select-small'>
                    <p className='font-10 font-700 mb-5'>{intl.formatMessage(msgCreateAccount.provider)}</p>
                    <Select placeholder={intl.formatMessage(msgDashboard.startTypingProvider)}>
                      <Select.Option value='1'>Dr. Rabinowitz </Select.Option>
                    </Select>
                    <div className='div-chip'>
                      {Array(3).fill(null).map((_, index) => <div key={index} className='chip'>Dr. Rabinowitz <BsX size={16} onClick={null} /></div>)}
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={7} className='select-small'>
                    <p className='font-10 font-700 mb-5'>{intl.formatMessage(msgCreateAccount.location)}</p>
                    <Select placeholder={intl.formatMessage(msgDashboard.startTypingLocation)}>
                      <Select.Option value='1'>Rabinowitz office</Select.Option>
                    </Select>
                    <div className='div-chip'>
                      {Array(3).fill(null).map((_, index) => <div key={index} className='chip'>Rabinowitz office <BsX size={16} onClick={null} /></div>)}
                    </div>
                  </Col>
                </Row>
                <div className='text-right'>
                  <Button size='small' type='primary'>{intl.formatMessage(msgDashboard.apply).toUpperCase()}(10)</Button>
                </div>
              </CSSAnimate>
            </div>}
            {!isEventDetail && <><div className='calendar-content'>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                ref={this.calendarRef}
                headerToolbar={{
                  left: "filterButton",
                  center: "prev,title,next",
                  right: "monthToWeekButton,segmentView"
                }}

                views={{
                  monthToWeekButton: {
                    type: isMonth ? 'dayGridMonth' : 'timeGridWeek',
                    buttonText: btnMonthToWeek,

                  },
                  segmentView: {
                    type: isGridDayView === 'Grid' ? 'dayGridMonth' : 'listWeek',
                    buttonText: btnChangeDayView,
                  },
                  week: {
                    titleFormat: { month: 'numeric', day: 'numeric' }
                  },
                }}
                customButtons={{
                  filterButton: {
                    text: btnFilter,
                  },
                }}
                initialView='dayGridMonth'
                eventColor='#2d5cfa'
                eventDisplay='block'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={this.state.calendarWeekends}
                datesSet={this.handleDates}
                // select={this.handleDateSelect}
                // events={this.state.calendarEvents}
                events={events}
                eventContent={renderEventContent}
                eventClick={this.handleEventClick}
                // eventAdd={this.handleEventAdd}
                // eventChange={this.handleEventChange} // called for drag-n-drop/resize
                eventRemove={this.handleEventRemove}
              // ref={this.calendarComponentRef}
              />

            </div>
              <div className='btn-appointment'>
                <Dropdown overlay={menu} placement="topRight">
                  <Button
                    type='primary'
                    block
                    icon={<FaCalendarAlt size={19} />}
                    onClick={this.onShowDrawerDetailPost}
                  >
                    {intl.formatMessage(msgDashboard.makeAppointment)}
                  </Button>
                </Dropdown>
              </div></>}
              {/*de lam phan admin sau*/}
            {/* {isEventDetail && <EventDetail backView={this.handleEventClick} />} */}
          </section>
        </div>
        <div className='btn-call'>
          <img src='../images/call.png' />
        </div>
        <DrawerDetail
          visible={visibleDetail}
          onClose={this.onCloseDrawerDetail}
        />
        <DrawerDetailPost
          visible={visibleDetailPost}
          onClose={this.onCloseDrawerDetailPost}
        />
        
        <ModalSubsidyProgress {...modalSubsidyProps} />
      </div>
    );
  }
}
function reportNetworkError() {
  alert('This action could not be completed')
}
function renderEventContent(eventInfo) {
  return (
    <>
      <b className='mr-3'>{eventInfo.timeText}</b>
      <span className='event-title'>{eventInfo.event.title}</span>
    </>
  )
}