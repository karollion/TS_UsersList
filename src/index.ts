// const inquirer = require('inquirer');

// inquirer.prompt([{
  //   name: 'name',
  //   type: 'input',
  //   message: 'What\'s your name?',
  // }, {
//   name: 'age',
//   type: 'number',
//   message: 'How old are you?',
//   default: 18,
// }]).then((answers: { name: string, age: number}) => {
  //   console.log(`\nHi ${answers.name}. ${answers.age}? Nice! \n`);
  // });
  
const inquirer = require('inquirer');
const consola = require('consola');

enum MessageVariant {
  Success = "success", 
  Error = "error", 
  Info = "info"
}

enum Action {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit"
};

type InquirerAnswers = {
  action: Action
};

class Message {
	constructor(private content: string) {}

	public show(): void {
		console.log(this.content)
	}

	public capitalize()  {
		this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLocaleLowerCase()
	}

	public toUpperCase() {
		this.content = this.content.toUpperCase()
	}

	public toLowerCase() {
		this.content = this.content.toLocaleLowerCase()
	}

	public static showColorized(variant: MessageVariant, text: string): void {
		if (variant === MessageVariant.Success) {
			consola.success(text)
		} else if (variant === MessageVariant.Error) {
			consola.error(text)
		} else if (variant === MessageVariant.Info) {
			consola.info(text)
		} else {
			consola.info(text)
		}
	}
}

const msg = new Message("heLlo world!");
msg.show(); // "heLlo world!"
msg.capitalize();
msg.show(); // "Hello world!"
msg.toLowerCase();
msg.show(); // "hello world!"
msg.toUpperCase();
msg.show(); // "HELLO WORLD!"
Message.showColorized(MessageVariant.Success, "Test"); // √ "Test"
Message.showColorized(MessageVariant.Error, "Test 2"); // "x Test 2"
Message.showColorized(MessageVariant.Info, "Test 3"); // ℹ "Test 3"

const startApp = () => {
  
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then( async (answers: InquirerAnswers) => {
    console.log("Chosen action: " + answers.action);
    startApp();
    if (answers.action === "quit")
      return;
  });
};

startApp();