import * as React from 'react';

type ReactProps = {children:any}
export const Row = (props:ReactProps) => <div className="row">{props.children}</div>;
export const Column = (props:ReactProps & {columnWidthForMediumScreen:number}) => 
    <div className={`col-md-${props.columnWidthForMediumScreen}`}>{props.children}</div>;