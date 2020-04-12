import React, { Component } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";


import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-min-noconflict/ext-language_tools";

class EditorJava extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      editorHeight: 400,
      editorWidth: "auto"
    }
    this.onResize = this.onResize.bind(this)

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    console.log("updated EditorJava Content :", newValue);
    const { updatedContent } = this.props;
    updatedContent(newValue);
  };

  onResize(w, h) {
    this.setState({
      editorHeight: h,
      editorWidth: w
    })
  };

  // Render editor
  render() {
    return (
      <div>
        <AceEditor
          placeholder="Placeholder Text"
          mode="java"
          theme="eclipse"
          name="blah2"
          height={this.state.editorHeight}
          width={this.state.editorWidth}
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          readOnly={this.props.readOnly}
          showPrintMargin={true}
          showGutter={this.props.showGutter == 'true' ? true : false}
          highlightActiveLine={true}
          value={this.props.content}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }} />
      </div>);
  }
};

export default EditorJava;
