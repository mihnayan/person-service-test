/**
 * Person service web-client application
 */

"use strict";

var personModel = (function () {

	return {
		/**
		 * Asynchronous request for all persons
		 * @param callback Callback function that will handle received data
		 */
		persons: function (callback) {
        
			var url = '/person/service';
        
			$.get(url, function (data, textStatus, xhr) {
				if (textStatus !== 'success') {
					console.log('Persons request error! textStatus: ' + textStatus);
				}
				if (typeof callback === 'function') {
					callback(data);
				}
			}, 'json');
		}
	}
}());

var getTable = function (tableId) {

    return new function () {
        var table = document.getElementById(tableId);
        var self = this;

        var tbody = null;
        var hf = {
            thead: null,
            tfoot: null
        };

        var setHeadFootRow = function (cells, tableElement) {
            var newElement = document.createElement(tableElement);

            var tr = document.createElement("tr");
            for (var i = 0, n = cells.length; i < n; i++) {
                var th = document.createElement("th");
                th.innerHTML = cells[i];
                tr.appendChild(th);
            }
            newElement.appendChild(tr);
            if (hf[tableElement] !== null) {
                table.replaceChild(newElement, hf[tableElement]);
            } else {
                table.appendChild(newElement);
            }
            hf[tableElement] = newElement;
        }

        this.setHead = function (headCells) {
            setHeadFootRow(headCells, "thead");
            return self;
        };

        this.setFooter = function (footerCells) {
            setHeadFootRow(footerCells, "tfoot");
            return self;
        };

        this.setBody = function (data, fieldNames) {
            var body = document.createElement("tbody");
            for (var i = 0, ni = data.length; i < ni; i++) {
                var tr = document.createElement("tr");
                var trClass = i%2 === 0 ? "odd" : "even";
                tr.setAttribute("class", trClass);

                for (var j = 0, nj = fieldNames.length; j < nj; j++) {
                    var td = document.createElement("td");
                    
                    var fieldName = fieldNames[j];
                    var text = data[i][fieldName];
                    if (fieldName === 'id') {
                    	text = '<input type="radio" name="personId" value=\"' + text + '\">' + text;
                    }
                    td.innerHTML = text;
                    tr.appendChild(td);
                }
                body.appendChild(tr);
            };
            if (tbody !== null) {
                table.replaceChild(body, tbody);
            } else {
                table.appendChild(body);
            }
            tbody = body;
            return self;
        };
    };
}

var showForm = function () {
	$('#command-buttons button').attr('disabled', 'disabled');
	$('#edit-form').show();
}

var hideForm = function () {
	$('#edit-form').hide();
	$('#command-buttons button').removeAttr('disabled');
}

$(document).ready(function () {
	console.log('document ready!');
	var tbl = getTable('person-table');
	tbl.setHead(
			["Идентификатор", 
			 "Фамилия", 
			 "Имя", 
			 "Отчество", 
			 "Дата рождения"]);
	personModel.persons(function (data) {
		tbl.setBody(data, ["id", "surname", "name", "patronymic", "bornDate"]);
	});
});

