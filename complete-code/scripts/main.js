/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
 (function() {

  let currentButton;

  function handlePlay(event) {
    loadWorkspace(event.target);
    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    code += 'MusicMaker.play();';
    // Eval can be dangerous. For more controlled execution, check
    // https://github.com/NeilFraser/JS-Interpreter.
    try {
      eval(code);
    } catch (error) {
      console.log(error);
    }
  }

  function loadWorkspace(button) {
    let workspace = Blockly.getMainWorkspace();
    workspace.clear();
    if (button.blocklyXml) {
      Blockly.Xml.domToWorkspace(button.blocklyXml, workspace);
    }
  }

  function save(button) {
    button.blocklyXml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
  }

  function handleSave() {
    document.body.setAttribute('mode', 'edit');
    save(currentButton);
  }

  function enableEditMode() {
    document.body.setAttribute('mode', 'edit');
    btn = document.getElementById('build_blocks')
    btn.removeEventListener('click', handlePlay);
    btn.addEventListener('click', enableBlocklyMode);

    btn2 = document.getElementById('preview_classes')
    btn2.removeEventListener('click', handlePlay);
    btn2.addEventListener('click', enablePreviewMode);
  }

  function enableMakerMode() {
    document.body.setAttribute('mode', 'maker');
    document.querySelectorAll('.button').forEach(btn => {
      btn.addEventListener('click', handlePlay);
      btn.removeEventListener('click', enableBlocklyMode);
    });
  }

  function enableBlocklyMode(e) {
    document.body.setAttribute('mode', 'blockly');
    currentButton = e.target;
    loadWorkspace(currentButton);
  }

  function enablePreviewMode(e) {
    // document.body.setAttribute('mode', 'blockly');
    loadWorkspace(document.getElementById('build_blocks'));
    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    try {
      // eval(code);
      console.log(JSON.parse(code.substring(0,code.length-1)))
    } catch (error) {
      console.log(error);
    }
  }

  document.querySelector('#edit').addEventListener('click', enableEditMode);
  document.querySelector('#done').addEventListener('click', enableMakerMode);
  document.querySelector('#save').addEventListener('click', handleSave);

  enableEditMode();

  Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    scrollbars: false,
  });
})();
