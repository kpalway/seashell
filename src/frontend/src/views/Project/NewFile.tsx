import * as React from "react";

import {merge} from "ramda";

import * as Blueprint from "@blueprintjs/core";
import {map, actionsInterface} from "../../actions";

export interface AddFileWindowProps {questions: string[]; closefunc: Function; };

class AddFileWindow extends React.Component<AddFileWindowProps&actionsInterface, {question: string; file: string, prevFile: string}> {
  project: string;
  constructor(props: AddFileWindowProps&actionsInterface) {
    super(props);
    if(this.props.appState.currentProject){
      this.project = this.props.appState.currentProject.id;
      this.state = {
      question: this.props.questions[0],
      file: "",
      prevFile: ""
    };}
    else{
      throw new Error("AddFile invoke on undefined project!");
    }
  }
  render() {
    return(<div className="pt-dialog-body">
      <p>What would you like to call this file?</p>
      <div><div className="pt-select pt-fill"><select id="question" value={this.state.question} onChange={(e) => this.setState(merge(this.state, {question: e.currentTarget.value}))}>
        {this.props.questions.map((question: string) => (<option value={question}>{question}</option>))}
        </select></div>
        <input className="pt-input pt-fill" required type="text" value={this.state.file}
        onBlur={() => {
          if (this.state.file === "" || this.state.file.includes("/")) {
            this.setState(merge(this.state, {file: this.state.prevFile}));
          }
          else {
            this.setState(merge(this.state, {prevFile: this.state.file}));
          }
        }}
        onChange={(e => this.setState(merge(this.state, {file: e.currentTarget.value})))}/></div>
      <div className="pt-button-group">
        <button type="button" className="pt-button" onClick={() => {
                this.props.closefunc();
                }}>Cancel</button>
        <button type="button" className="pt-button pt-intent-primary" disabled = {this.state.file === "" || this.state.file.includes("/")} onClick={() => {
          this.props.dispatch.file.addFile(this.project, this.state.question + "/" + this.state.file,
          this.state.file.split(".").pop() === "c" ? "int main(){\n\treturn 0;\n}" : 
          this.state.file.split(".").pop() === "h" ? "//put your interface here\n" :
          this.state.file.split(".").pop() === "rkt" ? "#lang racket\n" : "");
          this.props.closefunc();
          }}>Add File</button>
      </div>
    </div>
    );
  }
}

export default map<AddFileWindowProps>(AddFileWindow);