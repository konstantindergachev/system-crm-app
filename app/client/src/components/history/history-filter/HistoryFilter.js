import M from 'materialize-css';
import PropTypes from 'prop-types';
import React from 'react';
import { validate } from '../../../helpers/dateFilter';
import TextFieldGroup from '../../ui/text-field-group/TextFieldGroup';
import { HISTORY, DATE_PICKER_FORMAT } from '../../../constants';

import './HistoryFilter.scss';

class HistoryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber: '',
      datePickerStart: {},
      datePickerEnd: {},
      isValid: true,
    };
    this.refDatePickerStart = React.createRef();
    this.refDatePickerEnd = React.createRef();
  }
  componentDidMount() {
    if (this.refDatePickerStart.current && this.refDatePickerEnd.current) {
      this.setState({
        datePickerStart: M.Datepicker.init(this.refDatePickerStart.current.firstElementChild, {
          format: DATE_PICKER_FORMAT,
          showClearBtn: true,
          onClose: () => {
            const { datePickerStart, datePickerEnd } = this.state;
            const isValid = validate(datePickerStart, datePickerEnd);
            this.setState(() => ({
              isValid: isValid,
            }));
          },
        }),
        datePickerEnd: M.Datepicker.init(this.refDatePickerEnd.current.firstElementChild, {
          format: DATE_PICKER_FORMAT,
          showClearBtn: true,
          onClose: () => {
            const { datePickerStart, datePickerEnd } = this.state;
            const isValid = validate(datePickerStart, datePickerEnd);
            this.setState(() => ({
              isValid: isValid,
            }));
          },
        }),
      });
    }
  }

  componentWillUnmount() {
    this.setState((oldState) => ({
      datePickerStart: oldState.datePickerStart.destroy(),
      datePickerEnd: oldState.datePickerEnd.destroy(),
    }));
  }
  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
      isValid: !ev.target.value ? true : false,
    });
  };

  render() {
    const { isValid, orderNumber, datePickerStart, datePickerEnd } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div className="filter js-filter-block">
        <form
          className="fr history__filter"
          onSubmit={(ev) => handleSubmit(ev, orderNumber, datePickerStart, datePickerEnd)}
        >
          <div className="col order">
            <div className="input-field inline order-position-input">
              <TextFieldGroup
                type="number"
                placeholder="Номер замовлення"
                name="orderNumber"
                value={this.state.orderNumber}
                onChange={this.handleChange}
                // error={errors.number}
              />
            </div>
          </div>
          <div className="col filter-pickers">
            <div className="input-field" ref={this.refDatePickerStart}>
              <TextFieldGroup name="start" placeholder="Початок (дата)" />
            </div>

            <div className="input-field" ref={this.refDatePickerEnd}>
              <TextFieldGroup name="end" placeholder="Кінець (дата)" />
            </div>
          </div>
          <button
            type="submit"
            className="btn waves-effect wavers-light btn-small"
            disabled={isValid}
          >
            {HISTORY.BTN_FILTER}
          </button>
        </form>
      </div>
    );
  }
}

HistoryFilter.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default HistoryFilter;
