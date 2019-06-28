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
import { shallow, mount } from 'enzyme';
import UU5 from "uu5g04";
import "uu5g04-bricks";
import enzymeToJson from 'enzyme-to-json';
import TestTools from "../../core/test/test-tools.js";
import createReactClass from "create-react-class";

const TagName = "UU5.Bricks.Lsi";

const MyAllowTagsLsi = createReactClass({
  mixins: [UU5.Common.BaseMixin],
  statics: { tagName: "UU5.Example.MyCompButton", classNames: { main: "mytr" } },
  render() {
    return (
      <UU5.Example.MyCompButton {...this.getMainPropsToPass()} />
    );
  }
});

const CONFIG = {
  mixins: [
    "UU5.Common.BaseMixin",
    "UU5.Common.ElementaryMixin",
    "UU5.Common.LsiMixin",
    "UU5.Common.ContentMixin",
    "UU5.Common.NestingLevelMixin",
    "UU5.Common.PureRenderMixin"
  ],
  props: {
    lsi: {
      values: [{ "en-gb": "value", sk: "hodnota", cs: "hodnota" }]
    },
    allowTags: {
      allowTagsArray: ["UU5.Example.MyCompButton"]
    },
    params: {
      values: [
        ["Ahoj", "123"]
      ]
    }
  },
  requiredProps: {
    children: <UU5.Bricks.Lsi.Item id={"childID"} language="cs" content="Text in Children" />
  },
  opt: {
    shallowOpt: {
      disableLifecycleMethods: false
    },
    enzymeToJson: false
  }
};


describe(`${TagName} props`, () => {
  TestTools.testProperties(TagName, CONFIG);
});

describe(`${TagName} allowTags`, () => {

  it(`${TagName} props - allowTags is used in example`, () => {
    const wrapper = shallow(
      <UU5.Bricks.Lsi id={"uuID"} allowTags={["UU5.Example.MyCompButton"]}>
        <MyAllowTagsLsi id={"allowID"} content={"Allow Content"} tooltip={"This is my allow tags component."} />
        <UU5.Bricks.Lsi.Item id={"uuID2"} language="cs">
          Item: cs, en, sk (cs) Při neznámém jazyku se zobrazí Environment.defaultLanguage en
        </UU5.Bricks.Lsi.Item>
        <UU5.Bricks.Lsi.Item
          id={"uuID3"}
          language="en"
          content="Item: cs, en, sk -> (en) When an unknown language is displayed Environment.defaultLanguage en"
        />
      </UU5.Bricks.Lsi>
    );
    expect(enzymeToJson(wrapper)).toMatchSnapshot();
  });

});

describe(`${TagName} children as fn`, () => {

  it(`${TagName} props - children is used in example`, () => {
    const mockFn = jest.fn();

    const wrapper = mount(
      <UU5.Bricks.Lsi id={"uuID"}>
        {opt => {
          mockFn(opt);
          return opt.language;
        }}
      </UU5.Bricks.Lsi>
    );

    expect(mockFn).toBeCalled();
    expect.stringContaining(mockFn.mock.calls[0][0].language);
  });

});