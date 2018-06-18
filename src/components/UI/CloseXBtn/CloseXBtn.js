import React from 'react';

import classes from './CloseXBtn.css';

const closeXBtn = (props) => (
    <div className={classes.CloseXBtn} onClick={props.clicked}>X</div>
);

export default closeXBtn;