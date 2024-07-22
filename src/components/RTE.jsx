import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='your-tinymce-api-key'
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            menubar: false,
                            toolbar: 'bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background-color:transparent; color:inherit; }'
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}
