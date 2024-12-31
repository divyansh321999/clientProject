import React from 'react';
import './styles/ToDoCard.css';

const ToDoCard = ({ details, filterProperties }) => {
  function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  function formatDateStringWithTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).replace(/,/g, '');
  }

  function getTimeStatus(dateString) {
    const inputTime = new Date(dateString).getTime();
    const currentTime = Date.now();
    const timeDifference = inputTime - currentTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 24) {
      return 'red';
    } else if (hoursDifference < 72) {
      return 'orange';
    } else {
      return 'green';
    }
  }

  const cardStatus = getTimeStatus(details.deadline);

  // If the cardStatus matches a color that is `false` in filterProperties, return null to hide the card.
  if (!filterProperties[cardStatus]) {
    return null;
  }

  return (
    <div className="todoCard" style={{ color: cardStatus }}>
      <h3>{details.topic}</h3>
      <p>{details.notes}</p>
      <div className="timestamps">
        <p style={{ backgroundColor: cardStatus }}>
          Created: {formatDateString(details.createdAt)}
        </p>
        <p style={{ backgroundColor: cardStatus }}>
          DeadLine: {formatDateStringWithTime(details.deadline)}
        </p>
      </div>
    </div>
  );
};

export default ToDoCard;
