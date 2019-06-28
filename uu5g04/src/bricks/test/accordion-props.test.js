/**
 * Copyright (C) 2019 Unicorn a.s.
 * 
 * This program is free software; you can use it under the terms of the UAF Open License v01 or
 * any later version. The text of the license is available in the file LICENSE or at www.unicorn.com.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See LICENSE for more details.
 * 
 * You may contact Unicorn a.s. at address: V Kapslovne 2767/2, Praha 3, Czech Republic or
 * at the email: info@unicorn.com.
 */

import React from 'react';
import {shallow} from 'enzyme';
import UU5 from "uu5g04";
import "uu5g04-bricks";
import enzymeToJson from 'enzyme-to-json';
import TestTools from "../../core/test/test-tools.js";
import createReactClass from "create-react-class";

//`${TagName}`

/**
 * This is a created component for the Allow Tags test.
 * It is tested that a self-created component can be inserted into the accordion under its own brand.
 */
const MyAllowTagsComponents = createReactClass({
  mixins: [UU5.Common.BaseMixin],
  statics: {tagName: "UU5.Example.MyCompButton", classNames: {main: "mytr"}},
  render() {
    return (
      <UU5.Example.MyCompButton {...this.getMainPropsToPass()}/>
    );
  }
});

/**
 * This is the accordion component that contains the onClick handler that is used to test the function type props.
 */
const MyAccordion = createReactClass({

  getInitialState: () => {
    return {
      isCalled: false
    };
  },

  onClickAlert(event) {
    alert("You just clicked on the accordion");
    this.setState({isCalled: true})
  },

  render() {
    return (
      <UU5.Bricks.Accordion id={"uuID1"} onClick={this.onClickAlert}>
        <UU5.Bricks.Panel id={"uuID2"} header="Panel 1" content="Panel content One" iconCollapsed={"uu5-minus"}
                          iconExpanded={"uu5-plus"}/>
      </UU5.Bricks.Accordion>
    );
  }
});

const TagName = "UU5.Bricks.Accordion";

const CONFIG = {
  mixins: [
    "UU5.Common.BaseMixin",
    "UU5.Common.ElementaryMixin",
    "UU5.Common.ColorSchemaMixin",
    "UU5.Common.ContentMixin",
    "UU5.Common.NestingLevelMixin",
    "UU5.Common.PureRenderMixin"
  ],
  props: {
    panels: {
      values: [
        [
          {header: "panel1", content: "panel1"}
        ]
      ]
    },
    onClickNotCollapseOthers: {
      values: [true, false]
    },
    iconExpanded: {
      values: ["uu5-minus"]
    },
    iconCollapsed: {
      values: ["uu5-plus"]
    },
    //onClick: {},
    allowTags: {
      allowTagsArray: ["UU5.Example.MyCompButton"]
    },
    size: {
      values: ["s", "m", "l", "xl"]
    },
  },
  requiredProps: {
    children: [<UU5.Bricks.Panel id={"childrenID"} content="Text in Panel"/>]
  },
  opt: {
    enzymeToJson: true
  }
};


describe(`${TagName} props`, () => {
  TestTools.testProperties(TagName, CONFIG);
});

describe(`${TagName} props.Function`, () => {

  it(`${TagName} -  onClick() should be called`, () => {
    window.alert = jest.fn();
    const wrapper = shallow(
      <MyAccordion/>
    );
    expect(wrapper.state().isCalled).toBeFalsy();
    wrapper.simulate('click');
    expect(window.alert).toBeCalled();
    expect(window.alert).toHaveBeenCalledWith('You just clicked on the accordion');
    expect(wrapper.state().isCalled).toBeTruthy();
    expect(window.alert.mock.calls[0][0]).toEqual("You just clicked on the accordion");
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });


});

describe(`${TagName} AllowTagsComponent`, () => {

  it(`${TagName} props - allowTags`, () => {
    const wrapper = shallow(
      <UU5.Bricks.Accordion id={"uuID1"} allowTags={["UU5.Example.MyCompButton"]}>
        <UU5.Bricks.Panel id={"uuID2"} header="Panel 1" content="Panel content"/>
        <MyAllowTagsComponents tooltip={"This is my allowTags Component"} id={"myAllowTagsID"}/>
      </UU5.Bricks.Accordion>
    );
    expect(wrapper).toMatchSnapshot();
  });

});

describe(`${TagName} docKit example`, () => {

  it(`${TagName} example01`, () => {
    const wrapper = shallow(
      <UU5.Bricks.Accordion id={"uuID1"}>
        <UU5.Bricks.Panel id={"uuID2"} header="Panel 1" content="Panel content"/>
        <UU5.Bricks.Panel id={"uuID3"} header="Panel 2" content="Panel content"/>
        <UU5.Bricks.Panel id={"uuID4"} header="Panel 3" content="Panel content"/>
      </UU5.Bricks.Accordion>
    );
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  })
});

