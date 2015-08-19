/**
 * Person service web-client application
 */

"use strict";

var timestampToDate = function (timestamp) {
	var leadZero = function (digit) {
		return digit > 9 ? digit : "0" + digit;
	}
	var dt = new Date(timestamp);
	return leadZero(dt.getDate()) + "." + leadZero(dt.getMonth() + 1) + "." + dt.getFullYear();
}

var dateToTimestamp = function (dateString) {
	var normalDate = dateString.split(".").reverse().join("-");
	return (new Date(normalDate)).getTime();
}

var personModel = (function () {

	var url = "/person/service";
	
	var convertBornDate = function (data) {
		if ($.isArray(data)) {
			for (var i = 0; i < data.length; i++) {
				data[i]["bornDate"] = timestampToDate(data[i]["bornDate"]);
			}
		}
		if ($.isPlainObject(data)) {
			data["bornDate"] = timestampToDate(data["bornDate"]);
		}
	};
	
	return {
		/**
		 * Asynchronous request for all persons
		 * @param callback Callback function that will handle received data
		 */
		persons: function (callback) {
        
			$.get(url, function (data, textStatus, xhr) {
				if (textStatus !== "success") {
					console.log("Persons request error! textStatus: " + textStatus);
					return;
				}
				convertBornDate(data);
				if (typeof callback === "function") {
					callback(data);
				}
			}, "json");
		},
		
		getPerson: function (id, callback) {
			$.get(url + "/" + id, function (data, textStatus, xhr) {
				if (textStatus !== "success") {
					console.log("Persons request error! textStatus: " + textStatus);
					return;
				}
				convertBornDate(data);
				if (typeof callback === "function") {
					callback(data);
				}
			}, "json");
		},
		
		addPerson: function (sentData, callback) {
			$.ajax({
				url: url,
				type: "post",
				data: sentData,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data, textStatus, xhr) {
					convertBornDate(data);
					if (typeof callback === "function") {
						callback(data);
					}
				}
			})
		}
	}
}());

var personTable = (function () {

	var table = document.getElementById("person-table");
	var fieldNames = ["id", "surname", "name", "patronymic", "bornDate"];
	
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
    };
    
    setHeadFootRow([" ", "ID", "Фамилия", "Имя", "Отчество", 
			 "Дата рождения"], "thead");
	
    return new function () {
        var self = this;

        this.setHead = function (headCells) {
            setHeadFootRow(headCells, "thead");
            return self;
        };

        this.setFooter = function (footerCells) {
            setHeadFootRow(footerCells, "tfoot");
            return self;
        };

        this.setBody = function (data) {
            var body = document.createElement("tbody");
            for (var i = 0, ni = data.length; i < ni; i++) {
                var tr = document.createElement("tr");
                var trClass = i%2 === 0 ? "odd" : "even";
                tr.setAttribute("class", trClass);
                
                var radioCell = document.createElement("td");
                radioCell.innerHTML = "<input type=\"radio\" name=\"personId\" value=\""
                	+ data[i]["id"] + "\">";
                tr.appendChild(radioCell);
                
                for (var j = 0, nj = fieldNames.length; j < nj; j++) {
                    var td = document.createElement("td");
                    
                    var fieldName = fieldNames[j];
                    var text = data[i][fieldName];
                    td.innerHTML = text;
                    tr.appendChild(td);
                }
                body.appendChild(tr);
            }

            if (tbody !== null) {
                table.replaceChild(body, tbody);
            } else {
                table.appendChild(body);
            }
            tbody = body;
            return self;
        };
    };
}());

var showForm = function () {
	$("#command-buttons button").attr("disabled", "disabled");
	$("div#form").show();
};

var hideForm = function () {
	$("div#form").hide();
	$("#command-buttons button").removeAttr("disabled");
};

var clearForm = function () {
	$("form#edit-form input").each(function (i, e) {
		e.value = "";
	});
};

var loadFormData = function (id) {
	var selected = $("input:radio[name='personId']:checked");
	if (selected.lenght <= 0) {
		return;
	}
	var selectedId = selected.val();
	personModel.getPerson(selectedId, function (data) {
		$("form#edit-form input").each(function (i, e) {
			e.value = data[e.getAttribute("name")];
		});
		showForm();
	});
};

var sendFormData = function () {
	hideForm();
	var person = {};
	$("form#edit-form input").each(function (i, e) {
		person[e.getAttribute("name")] = e.value;
	});
	person["bornDate"] = dateToTimestamp(person["bornDate"]);
	personModel.addPerson(JSON.stringify(person), function (data) {
		personTable.setBody(data);
	});
	clearForm();
};

var cancelForm = function () {
	hideForm();
	clearForm();
}

$(document).ready(function () {
	new JsDatePick({
		useMode: 2,
		target: "borndate-text",
		dateFormat: "%d.%m.%Y",
		limitToToday: true
	});
	
	personModel.persons(function (data) {
		personTable.setBody(data);
	});
});

