import {RENDER_TYPES} from '../../utils/constants.js';
import {makeSafe} from '../../utils/safe.js';

export class BoardComponent {
	constructor({
		el = document.body,
		type = RENDER_TYPES.DOM,
	} = {}) {
		this._el = el;
		this._type = type;
	}

	get data() {
		return this._data;
	}

	set data(d = []) {
		this._data = d;
	}

	_renderDOM() {
		const table = document.createElement('table');
		const thead = document.createElement('thead');
		thead.innerHTML = `
			<tr>
				<th>Email</th>
				<th>Age</th>
				<th>Score</th>
			</th>
		`;
		const tbody = document.createElement('tbody');

		table.appendChild(thead);
		table.appendChild(tbody);
		table.border = 1;
		table.cellSpacing = table.cellPadding = 0;

		this._data.forEach(function ({
			email = 'test@mail.ru',
			age = '13',
			score = 100500,
		} = {}) {
			const tr = document.createElement('tr');
			const tdEmail = document.createElement('td');
			const tdAge = document.createElement('td');
			const tdScore = document.createElement('td');

			tr.classList.add('table__row');

			tdEmail.innerHTML = makeSafe(email);
			tdAge.textContent = age;
			tdScore.textContent = score;

			tr.appendChild(tdEmail);
			tr.appendChild(tdAge);
			tr.appendChild(tdScore);

			tbody.appendChild(tr);

			this._el.appendChild(table);
		}.bind(this));
	}

	_renderString() {
		this._el.innerHTML = `
			<table border="1" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Email</th>
						<th>Age</th>
						<th>Score</th>
					</tr>
				</thead>
				<tbody>
					${this._data
						.map(({
							email = 'test@mail.ru',
							age = '13',
							score = 100500,
						} = {}) => {
							return `
								<tr class="table__row">
									<td>${email}</td>
									<td>${age}</td>
									<td>${score}</td>
								</tr>
							`;
						})
						.join('\n')
					}
				</tbody>
			</table>
		`;
	}

	__renderTmpl() {
		this._el.innerHTML = window.fest['components/Board/Board.tmpl'](this._data);
	}

	render() {
		switch(this._type) {
			case RENDER_TYPES.DOM:
				this._renderDOM();
				break;
			case RENDER_TYPES.STRING:
				this._renderString();
				break;
			case RENDER_TYPES.TMPL:
				this.__renderTmpl();
				break;
			default:
		}
	}
}
