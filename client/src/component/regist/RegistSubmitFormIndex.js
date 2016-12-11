import * as React from 'react';
import { Form } from 'antd';
import { FormWithInput, SubmitButton, FormWithPassWord } from '../form/FormControls';
import { RegExChk, validatorType } from '../../utils/regex';
class FilterFormMock extends React.Component {
    constructor(props) {
        super(props);
        this.onSearchBinder = this.onSearch.bind(this);
    }
    onSearch(e) {
        e.preventDefault();
        console.log(this.props.form.getFieldValue());
    }
    trueNameChk(rule, value, callback) {
        if (!value) {
            callback();
        }
        else {
            setTimeout(() => {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该用户名已被占用。')]);
                }
                else {
                    callback();
                }
            }, 800);
        }
    }
    chkMobile(rule, value, callback) {
        if (!RegExChk(validatorType.mobile, value) && (value !== undefined) && value !== "") {
            callback(new Error('请输入11位数字的手机号'));
        }
        else {
            callback();
        }
    }
    chkUserName(rule, value, callback) {
        if (!RegExChk(validatorType.username, value) && (value !== undefined) && value !== "") {
            callback(new Error('账户名以英文字母开头，长度不少于4个字符'));
        }
        else {
            callback();
        }
    }
    render() {
        const { trueNameInput, emailInput, mobileInput, userNameInput, passWordInput, rePassWordInput, form, submit } = this.props;
        const { getFieldProps, getFieldError, isFieldValidating, getFieldValue } = this.props.form;
        const trueNameOptions = {
            rules: [
                { required: false, min: 2, max: 5, message: '昵称至少为 1-5 个字符' },
                { validator: this.trueNameChk },
            ]
        };
        const emailOptions = {
            validate: [{
                    rules: [
                        { required: true, message: '请输入您的邮箱' }
                    ],
                    trigger: 'onBlur'
                },
                {
                    rules: [
                        { type: 'email', message: '请填写正确的邮箱地址' }
                    ],
                    trigger: ['onBlur', 'onChange']
                }
            ]
        };
        const mobileOptions = {
            validate: [{
                    rules: [
                        { required: true, message: '请输入您的手机号' },
                        { validator: this.chkMobile }
                    ],
                    trigger: ['onBlur', 'onChange']
                }
            ]
        };
        const userNameOptions = {
            validate: [
                {
                    rules: [
                        { required: true, message: '请输入您的账户名' },
                        { validator: this.chkUserName }
                    ],
                    trigger: ['onBlur', 'onChange']
                }
            ]
        };
        return (React.createElement(Form, {className: "filter-form", horizontal: true}, React.createElement(FormWithInput, {IAntdProps: trueNameInput, help: isFieldValidating(trueNameInput.name) ? '校验中...' : (getFieldError(trueNameInput.name) || []).join(', '), form: form, options: trueNameOptions}), React.createElement("div", {style: { margin: '24px 0' }}), React.createElement(FormWithInput, {IAntdProps: emailInput, form: form, options: emailOptions}), React.createElement("div", {style: { margin: '24px 0' }}), React.createElement(FormWithInput, {IAntdProps: mobileInput, form: form, options: mobileOptions}), React.createElement("div", {style: { margin: '24px 0' }}), React.createElement(FormWithInput, {IAntdProps: userNameInput, form: form, options: userNameOptions}), React.createElement("div", {style: { margin: '24px 0' }}), React.createElement(FormWithPassWord, {iAntdPassWord: passWordInput, iAntdRePassWord: rePassWordInput, form: form}), React.createElement(SubmitButton, {antdButton: submit, form: form})));
    }
}
const FilterForm = Form.create({})(FilterFormMock);
/*const filterFormProps: IFilterFormProps = {
    trueNameInput:{
        id:"TrueName",
        name:"TrueName",
        labelName:"昵称",
        placeholder:"昵称",
    },
    emailInput:{
        id:"Email",
        name:"Email",
        labelName:"电子邮件",
        placeholder:"电子邮件"
    },
    mobileInput:{
        id:"Mobile",
        name:"Mobile",
        labelName:"手机号",
        placeholder:"手机号"
    },
    userNameInput:{
        id:"UserName",
        name:"UserName",
        labelName:"帐号",
        placeholder:"帐号"
    },
    passWordInput:{
        id:"Password",
        name:"Password",
        labelName:"密码",
        placeholder:"密码",
        type:"password"
    },
    rePassWordInput:{
        id:"RePassword",
        name:"RePassword",
        labelName:"确认密码",
        placeholder:"确认密码",
        type:"password"
    },
    submit: {
        handelSubmit: (fields: any)=> {
            console.log(fields);
            fields.validateFieldsAndScroll((errors,value)=>{
                if (!!errors) {
                    console.log('Errors in form!!!');
                    return;
                }
                console.log('Submit!!!');
                console.log(value);
            })
          //  console.log(fields.getFieldsValue());
        },
        text: "",
        className:"btn btn-lg btn-login btn-block",
        textClassName:"fa fa-check",
    }
};*/
//export const FilterFormInstance = () => <FilterForm {...filterFormProps} />
export const FilterFormInstance = (filterFormProps) => React.createElement(FilterForm, React.__spread({}, filterFormProps));
