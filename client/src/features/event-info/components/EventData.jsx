// libraries
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// context
import { Context } from '../../../context/Context';

// components
import { DefaultButton } from '../../../styled-components/buttons.js';

export default function EventData() {
  const [eventData, setEventData] = useState({});

  const { userID } = useContext(Context);

  const { eventid } = useParams();

  useEffect(() => {
    const getUser = async (e) => {
      const { data } = await axios.get(`/api/events/${eventid}`);
      console.log(`dashboard testing to see:`);
      console.log(`EventPage data:`, data);
      setEventData(data);
    };
    getUser();
  }, [eventid]);

  const handleSaveDate = async () => {
    try {
      console.log(userID, 'test of userID');
      const response = await axios.patch(
        `/api/events/update
      `,
        { userAttending: userID, id: eventid }
      );
      console.log(response.data);
      console.log('response.data.eventToReturn', response.data.eventToReturn);
      setEventData({ event: response.data.eventToReturn });
    } catch (error) {
      console.log('handleSaveData error', error.message);
    }
  };
  const eventSchemaDate = eventData?.event?.date;
  // console.log('eventSchemaDate : ', eventSchemaDate);
  const Day = new Date(eventSchemaDate);
  // console.log('Day: ', Day.toUTCString().slice(0, -13));
  const dayOfWeek = Day.toUTCString().slice(0, -26);
  const eventDateFormatted =
    Day.getDate() + '.' + (Day.getMonth() + 1) + '.' + Day.getFullYear();
  console.log('eventDateFormatted', dayOfWeek, eventDateFormatted);

  // const dateString = "2020-10-30T12:52:27+05:30"; // ISO8601 compliant dateString
  // const D = new Date(dateString);
  // const result = D.getDate()+"/"+(D.getMonth()+1)+"/"+D.getFullYear();

  // handleSaveDate(eventData?.event?.id)
  console.log(' eventData userID before return', userID);
  console.log(' only eventData ', eventData);

  return (
    <section className="event-data-container">
      <div className="event-info-wrapper">
        <div className="event-date-price-wrapper">
          {/* <div className="event-date">{format(eventData?.event?.date, 'LLLL yy')}</div> */}
          <div>
            {dayOfWeek} {eventDateFormatted}
          </div>
          <div>{eventData?.event?.tickets?.doorPrice} €</div>
        </div>

        <div className="band-event-name-wrapper">
          <div className="band-name">{eventData?.event?.name?.bandName}</div>
          <div className="event-name">{eventData?.event?.name?.eventName}</div>
        </div>

        <div className="event-location-time-wrapper">
          <div>{eventData?.event?.location.name}</div>
          <div>{eventData?.event?.time?.startTime} Start Time</div>
        </div>

        <div className="event-description">
          <p>{eventData?.event?.information?.description}</p> 
        </div>

        <div className="button-wrapper">
          <DefaultButton className="save-date-btn" onClick={handleSaveDate}>
            {eventData?.event?.userAttending.includes(userID)
              ? 'Remove Date'
              : 'Save the Date'}
          </DefaultButton>
          <DefaultButton className="buy-ticket-btn">Buy Ticket</DefaultButton>
        </div>
      </div>

      <div className="event-img-wrapper">
        <img src={eventData?.event?.photoURL} alt="" />
      </div>
    </section>
  );
}