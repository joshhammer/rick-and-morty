import React from 'react';
import ReactLoading from 'react-loading';

const ReactLoader = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={200} width={100} />
);

export default ReactLoader;