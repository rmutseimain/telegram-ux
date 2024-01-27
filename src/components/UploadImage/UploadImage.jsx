import React, { useState} from "react";

const UploadImage = React.forwardRef((props, ref) => {
    const { question, onChangeQuestion } = props;
    const [ file, setFile ] = useState(null);

    return (
        <div className="input-group mb-3">
            <input type="file" className="form-control" id="file"
                   ref={ref}
                   onChange={(e) => {
                       setFile(e.target.files[0])
                       onChangeQuestion(question.id, e.target.files[0], e)
                   }}
            />
        </div>
    );
});

export default UploadImage;