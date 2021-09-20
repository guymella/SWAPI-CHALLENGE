import React, { Fragment, useState } from "react";

const Person = ({ Person }) => {
  
  const Extract_ID = (person) => {
    const parts = person.url.split("/");
    return parseInt(parts[parts.length-2]);
  };

  const List_Object = (object) => {
        if (Array.isArray(object) && !object.length){return "UNKNOWN"}

        return (<div>
            {Object.keys(object).map (key => (
                <div class="prop"> {(Array.isArray(object))? '' : (<div class="label">{key}</div>)}
                     <div Class="value">{(typeof object[key] === "object") ?  List_Object(object[key]) : object[key] }</div>
                </div>
            ))}
        </div>
        )
  }

  return (
    <Fragment>
      <div
        type="button"
        class="btn btn-warning tile"
        data-toggle="modal"
        data-target={`#id${Extract_ID(Person)}`}
      >
        {Person.name}
      </div>

      <div
        class="modal"
        id={`id${Extract_ID(Person)}`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">{Person.name}</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
                <ul>
                    {List_Object(Person)}
                </ul>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Person;