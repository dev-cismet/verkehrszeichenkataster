import { useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./splittstyle.css";

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

MdEditor.addLocale("de-DE", {
  btnHeader: "Überschrift",
  btnClear: "Löschen",
  btnBold: "Fett",
  btnItalic: "Kursiv",
  btnUndo: "Rückgängig machen",
  btnRedo: "Wiederholen",
  btnUnderline: "Unterstrichen",
  btnStrikethrough: "Durchgestrichen",
  btnUnordered: "Aufzählungsliste",
  btnOrdered: "Nummerierte Liste",
  btnQuote: "Zitat",
  btnLink: "Link",
});
MdEditor.useLocale("de-DE");

const ViewMode = (props) => {
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const handleClickPreview = () => {
    props.editor.setView({
      md: false,
      menu: true,
      html: true,
    });
    setIsPreviewActive(true);
  };
  const handleClickWrite = () => {
    props.editor.setView({
      md: true,
      menu: true,
      html: false,
    });
    setIsPreviewActive(false);
  };

  return (
    <div>
      <div
        className={
          !isPreviewActive ? "mode-btn-toggle-active" : "mode-btn-toggle"
        }
        onClick={handleClickWrite}
      >
        Bearbeiten
      </div>
      <div
        className={
          isPreviewActive ? "mode-btn-toggle-active" : "mode-btn-toggle"
        }
        onClick={handleClickPreview}
      >
        Vorschau
      </div>
    </div>
  );
};

ViewMode.defaultConfig = {};
ViewMode.align = "right";
ViewMode.pluginName = "viewmode";

MdEditor.use(ViewMode, {});

const pluginsListSplited = [
  "viewmode",
  "divider",
  "logger",
  "divider",
  "header",
  "font-bold",
  "font-italic",
  "list-unordered",
  "list-ordered",
  "block-quote",
  "link",
];

const MdRedactor = ({
  mdDoc = "",
  getDocument = () => console.log("getDoc function"),
  saveTrigger = 1,
  width = "100%",
  height = "700px",
}) => {
  const [mdText, setMdText] = useState(mdDoc);

  const handleEditorChange = ({ html, text }) => {
    getDocument(text);
    setMdText(text);
  };

  return (
    <div>
      <MdEditor
        style={{ width, height }}
        plugins={pluginsListSplited}
        renderHTML={(text) => mdParser.render(text)}
        value={mdText}
        onChange={handleEditorChange}
        // onImageUpload={onImageUpload}
        shortcuts={true}
        view={{ menu: true, md: true, html: false }}
      />
    </div>
  );
};

export default MdRedactor;
