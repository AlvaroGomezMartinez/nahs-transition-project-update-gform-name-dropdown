/* 
The function below fills in the dropdown in question 1 with student names from the TENTATIVE sheet.
The function is set to run on a time trigger that fires every five minutes.

Point of contact is Alvaro Gomez, Academic Technology Coach, 210-363-1577
Latest update: 11/21/23
*/

function populateDropdown() {
  var form = FormApp.openById('1sMCa-sRlMG2BE28_u0XK_icQuPhQKvp1x-5uR3iiA5A'); // This is the editable Google Form
  var sheet = SpreadsheetApp.openById('1MTg2DdLGRKtdb2KuVwU-vmn-L_4dIUzW7uKp_AYSVI4'); // This is the 2023-2024 NAHS Student Transition Notes sheet

  var lastNames = sheet.getRange('TENTATIVE!B2:B').getValues().filter(String);
  var firstNames = sheet.getRange('TENTATIVE!C2:C').getValues().filter(String);
  var id = sheet.getRange('TENTATIVE!D2:D').getValues().filter(String);
  var grade = sheet.getRange('TENTATIVE!E2:E').getValues().filter(String);  

  var questionIdToUpdate = '516226695'; // Replace with the actual question ID

  var formItem = form.getItemById(questionIdToUpdate);
  
  if (formItem) {
    var itemType = formItem.getType();

    if (itemType === FormApp.ItemType.LIST) {
      var dropdownItem = formItem.asListItem();
      var choices = new Set();
      
      for (var i = 0; i < firstNames.length; i++) {
      var lastName = (lastNames[i] && lastNames[i][0] || '').toString().trim();
      var firstName = (firstNames[i] && firstNames[i][0] || '').toString().trim();
      var studentId = (id[i] && id[i][0] || '').toString().trim();
      var studentGrade = (grade[i] && grade[i][0] || '').toString().trim();

      // Check if any of the values are non-empty
      if (lastName !== "" && firstName !== "" && studentId !== "" && studentGrade !== "") {
          var fullName = lastName + ', ' + firstName + ' (' + studentId + ') Grade: ' + studentGrade;
          choices.add(fullName);
        }
      }

      var uniqueChoices = Array.from(choices); // Convert Set to an array
      uniqueChoices.sort();

      dropdownItem.setChoiceValues(uniqueChoices);
    } else {
      Logger.log('The specified item is not a List Item (dropdown).');
    }
  } else {
    Logger.log('Item with ID ' + questionIdToUpdate + ' not found.');
  }
}