import { h } from 'preact';
import { useState, useEffect,useRef } from 'preact/hooks';
import Axios from 'axios';
import { getItem, setItem, removeAll } from '../../lib/myStore';
import CONSTANTS from '../../lib/constants';
import Icons from '../../components/icons';
import {EditorState,Plugin} from "prosemirror-state";
import {EditorView,Decoration, DecorationSet} from "prosemirror-view";
import {Schema, DOMParser} from "prosemirror-model";
import {schema} from "prosemirror-schema-basic";
import {addListNodes} from "prosemirror-schema-list";
import {exampleSetup} from "prosemirror-example-setup";
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import { getInitials, getDay, getMonth } from '../../lib/utils';

const ChatComment = (props) => {
  const userInfo = getItem('userinfo');
  let [taskComment, setTaskComment] = useState([]);
  let [editorImages, setEditorImages] = useState([]);
  let [userDisplayName, setUserDisplayName] = useState(userInfo.displayName);
  let [collaborators, setCollaborators] = useState([]);

  let view;

  const ref = useRef();
  let [isRightDropdownOpen,setRightDropdown]= useState(false);
  let [editorImagesCount, setEditorImagesCount] = useState(0);
  let [editorText, setEditorText] = useState("");
  let placeholderPlugin = new Plugin({
    state: {
      init() { return DecorationSet.empty; },
      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);
        let action = tr.getMeta(this);
        if (action && action.add) {
          let widget = document.createElement("placeholder");
          let deco = Decoration.widget(action.add.pos, widget, {id: action.add.id});
          set = set.add(tr.doc, [deco]);
        } else if (action && action.remove) {
          set = set.remove(set.find(null, null,
            spec => spec.id == action.remove.id));
        }
        return set;
      }
    },
    props: {
      decorations(state) { return this.getState(state); }
    }
  });


  useEffect(() => {
    // modified by Vihang
  // modifield on 18/02/2022
  // modification:Editor functionality changes

    view = window.view =  new EditorView(document.querySelector("#editor"), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(schema).parse(document.querySelector("#content")),
        plugins: exampleSetup({schema}).concat(placeholderPlugin)
      })
    });


    let addList = document.getElementsByClassName('ProseMirror-menubar')[0];
    let editor = document.getElementById("editor");
    let content = document.getElementsByClassName('ProseMirror-example-setup-style')[0];

    // modified by Vihang
    // modifield on 18/02/2022
    // modification:Editor functionality changes

    editor.addEventListener("click", (e) =>  {
      editor.style.border="1px solid #696d76";
      addList.setAttribute('class', "ProseMirror-menubar show-menubar");
      content.setAttribute('class', "ProseMirror ProseMirror-example-setup-style min-h-100");
      content.style.display="block";
      content.style.transition="min-height 250ms";
      content.focus();
    });


    window.addEventListener("click", (e) => {
      let editorClick = editor.contains(e.target);
      if (!editorClick) {
        editor.style.border="1px solid rgba(0, 0, 0, 0.2)";
        addList.setAttribute('class', "ProseMirror-menubar hide-menubar");
        content.setAttribute('class', "min-h-32");
        content.style.display="none";
      }
    });
    // window.onclick = (e) => {
    //   console.log(e,"window on click");
    //   // let contentClick = content.contains(e.target);
    //   let editorClick = editor.contains(e.target);
    //   if (!editorClick) {
    //     editor.style.border="1px solid rgba(0, 0, 0, 0.2)";
    //     addList.setAttribute('class', "ProseMirror-menubar hide-menubar");
    //     content.setAttribute('class', "min-h-32");
    //     content.style.display="none";
    //   }
    // };

    let spanImg = document.createElement('span');
    spanImg.setAttribute('class', "ProseMirror-menuitem");
    spanImg.setAttribute('title', "Select Image");

    let label = document.createElement('LABEL');
    label.setAttribute('for', "file-input");
    label.setAttribute('class', "p-r-0 p-l-0");


    let menuIcon = document.createElement('span');
    menuIcon.setAttribute('class', 'ProseMirror-icon');

    let img = document.createElement('img');
    img.src = "../assets/images/image_upload.svg";
    img.setAttribute('class', 'ProseMirror-icon ImageSize');

    let input = document.createElement("input");
    input.setAttribute('id', "file-input");
    input.setAttribute('class', 'HideInput');
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".png, .jpg, .jpeg, .webm");
    input.addEventListener("change", (e) => handleUploadChange(e));

    let btn = document.createElement("button");
    btn.setAttribute('class', "fs-10 pos-absolute");
    btn.innerText = "Comment";
    btn.style.style="border:1px solid #696d76";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      handleEditor(e);
    }
    );

    label.append(img);
    menuIcon.append(label);
    spanImg.append(menuIcon);
    spanImg.append(input);
    addList.append(spanImg);
    addList.append(btn);
    console.log(addList, 'addListaddListaddList');
    // modified by Vihang
    // modifield on 18/02/2022
    // modification:removed not needed options

    let removeMenuitems2 = document.getElementsByClassName('ProseMirror-menuitem')[2];
    let removeMenuitems3 = document.getElementsByClassName('ProseMirror-menuitem')[3];
    let removeMenuitems4 = document.getElementsByClassName('ProseMirror-menuitem')[4];
    let removeMenuitems5 = document.getElementsByClassName('ProseMirror-menuitem')[5];
    let removeMenuitems6 = document.getElementsByClassName('ProseMirror-menuitem')[6];
    let removeMenuitems7 = document.getElementsByClassName('ProseMirror-menuitem')[7];
    let removeMenuitems8 = document.getElementsByClassName('ProseMirror-menuitem')[8];
    let removeMenuitems9 = document.getElementsByClassName('ProseMirror-menuitem')[11];
    let removeseperator1 = document.getElementsByClassName('ProseMirror-menuseparator')[0];
    let removeseperator2 = document.getElementsByClassName('ProseMirror-menuseparator')[1];
    let removeseperator3 = document.getElementsByClassName('ProseMirror-menuseparator')[2];
    removeMenuitems2.remove();
    removeMenuitems3.remove();
    removeMenuitems4.remove();
    removeMenuitems5.remove();
    removeMenuitems6.remove();
    removeMenuitems7.remove();
    removeMenuitems8.remove();
    removeMenuitems9.remove();
    removeseperator1.remove();
    removeseperator2.remove();
    removeseperator3.remove();
    content.classList.remove("ProseMirror");
    content.classList.remove("ProseMirror-example-setup-style");
    return () => {
      view.destroy();
    };
  }, []);

  useEffect(async () => {
    if (props.selectedTask && props.selectedTask.observerIDs && props.selectedTask.observerIDs.length) {
      let collaboratorsData = await Axios.get(`${CONSTANTS.API_URL}/api/v1/userorganizations?uuids=${props.selectedTask.observerIDs}`);
      console.log("collaboratorsData",collaboratorsData);
      collaborators = collaboratorsData.data;
      setCollaborators(collaborators);
    }
  },[]);


  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the isRightDropdownOpen is open and the clicked target is not within the isRightDropdownOpen,
      // then close the isRightDropdownOpen
      if (isRightDropdownOpen && ref.current && !ref.current.contains(e.target)) {
        setRightDropdown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isRightDropdownOpen]);

  function handleUploadChange(e) {
    editorImages.push(e.target.files);
    setEditorImages(editorImages);

    if (view.state.selection.$from.parent.inlineContent && e.target.files.length)
      startImageUpload(view, e.target.files[0]);
    view.focus();
  }

  function startImageUpload(view, file) {
    let id = {};
    let tr = view.state.tr;

    if (!tr.selection.empty) tr.deleteSelection();
    tr.setMeta(placeholderPlugin, {add: {id, pos: tr.selection.from}});
    view.dispatch(tr);
    uploadFile(file).then(url => {
      let pos = findPlaceholder(view.state, id);
      if (pos == null) return;
      view.dispatch(view.state.tr
        .replaceWith(pos, pos, schema.nodes.image.create({src: url}))
        .setMeta(placeholderPlugin, {remove: {id}}));
    }, () => {
      view.dispatch(tr.setMeta(placeholderPlugin, {remove: {id}}));
    });
  }

  function uploadFile(file) {
    let reader = new FileReader;
    return new Promise((accept, fail) => {
      reader.onload = () => accept(reader.result);
      reader.onerror = () => fail(reader.error);
      setTimeout(() => reader.readAsDataURL(file), 1500);
    });
  }

  function findPlaceholder(state, id) {
    let decos = placeholderPlugin.getState(state);
    let found = decos.find(null, null, spec => spec.id == id);
    return found.length ? found[0].from : null;
  }

  async function handleEditor(e) {
    //clear comment box of the editor
    // console.log(document.getElementsByClassName("ProseMirror-example-setup-style")[0].innerHTML);
    // document.getElementsByClassName("ProseMirror-example-setup-style")[0].innerHTML = "";
    let editorImagesCount = editorImages.length;
    setEditorImagesCount(editorImagesCount);
    let formattedText = view.dom.innerHTML.match(/<img/) ? view.dom.innerHTML.replace(/<img .*?>/g,"") : view.dom.innerHTML;
    console.log("formattedText",formattedText);
    let emptyText = `<p><br class="ProseMirror-trailingBreak"></p>`;
    if ((formattedText !== "" || formattedText !== emptyText) && editorImages.length) {
      setEditorText(formattedText);
      props.onHandleEditorComment(formattedText,editorImages);
      setEditorImages([]);
      document.getElementsByClassName("ProseMirror-example-setup-style")[0].innerHTML = "";

      // let payload = {
      //   comment: formattedText,
      //   typeOfComment: 'message',
      //   taskID: props.currentRow ? props.currentRow.uuid : '',
      //   commentByID: userInfo ? userInfo.uuid : '',
      //   commentByName: userInfo ? userInfo.displayName : ''

      // };
      // await axios.post(`${CONSTANTS.API_URL}/api/v1/comment`, payload)
      //   .then((res) => {
      //     console.log(res);
      //   });
      // document.getElementById("editorText").innerHTML = formattedText;
    } else if ((formattedText === "" || formattedText === emptyText) && editorImages.length) {
      props.onHandleEditorComment('',editorImages);
      setEditorImages([]);
      document.getElementsByClassName("ProseMirror-example-setup-style")[0].innerHTML = "";
    } else if ((formattedText !== "" || formattedText !== emptyText)) {
      setEditorText(formattedText);
      props.onHandleEditorComment(formattedText,editorImages);
      setEditorImages([]);
      document.getElementsByClassName("ProseMirror-example-setup-style")[0].innerHTML = "";
    }
  }

  return (
    <div class="outer_chat_form_box_workspace pos-absolute display-flex p-t-10" style="bottom:0">
      <Icons userDisplayName={userDisplayName} title={userDisplayName} classes={'secondary fs-10 m-l-5 m-r-5'}/>
      <div class="chat__form w-full h-full">
        <form id="chat__form">
          <div id="editor" />
          <div style="display: none" id="content" />
        </form>
        <div class="display-flex align-center justify-between p-t-10 p-b-10">
          <div class="bottom_box" style="width:75%">
            <p class="p-r-5 fs-12" style="color: #958f8f">
                Collaborators
            </p>
            <div class="display-flex">
              {
                collaborators && collaborators.length !== 0 && collaborators.map((collaborator) => (
                  <Icons userDisplayName={collaborator.userName} title={collaborator.userName} classes={'secondary fs-10 m-l-5 m-r-5'}/>
                ))
              }
            </div>
            <div class="display-flex">
              <Icons userDisplayName={userDisplayName} title={userDisplayName} classes={'secondary fs-10 m-l-5 m-r-5'}/>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ChatComment;
