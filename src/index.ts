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
      
      // const msg = new Message("heLlo world!");
      // msg.show(); // "heLlo world!"
      // msg.capitalize();
      // msg.show(); // "Hello world!"
      // msg.toLowerCase();
      // msg.show(); // "hello world!"
      // msg.toUpperCase();
      // msg.show(); // "HELLO WORLD!"
      // Message.showColorized(MessageVariant.Success, "Test"); // √ "Test"
      // Message.showColorized(MessageVariant.Error, "Test 2"); // "x Test 2"
      // Message.showColorized(MessageVariant.Info, "Test 3"); // ℹ "Test 3"
      
      // users.showAll();
      // users.add({ name: "Jan", age: 20 });
      // users.add({ name: "Adam", age: 30 });
      // users.add({ name: "Kasia", age: 23 });
      // users.add({ name: "Basia", age: -6 });
      // users.showAll();
      // users.remove("Maurycy");
      // users.remove("Adam");
      // users.showAll();


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
  Edit = "edit",
  Remove = "remove",
  Quit = "quit"
};

type InquirerAnswers = {
  action: Action;
};

type User = {
  name: string;
  age: number;
}

class Message {
	constructor(private content: string) {}

	public show(): void {
		console.log(this.content)
	};

	public capitalize()  {
		this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLocaleLowerCase()
	};

	public toUpperCase() {
		this.content = this.content.toUpperCase()
	};

	public toLowerCase() {
		this.content = this.content.toLocaleLowerCase()
	};

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
	};
};

class UsersData {
  private data: User[] = [];

  public showAll(): void {
    Message.showColorized(MessageVariant.Info, 'Users data');
    if( this.data.length === 0) Message.showColorized(MessageVariant.Error,'No data...');
    else console.table(this.data);
  };

  public add (User: User): void {
    if(typeof User.age === 'number' && 
       typeof User.name === 'string' && 
       User.age > 0 && 
       User.name.length > 0){
        this.data.push(User);
        Message.showColorized(MessageVariant.Success,'User has been successfully added!');
    } else {
      Message.showColorized(MessageVariant.Error,'Wrong data!');
    }
  };

  public async edit (userName: string, newUserData: User) {
    const userIndex: number = this.data.findIndex((user) => user.name === userName);

    if(typeof newUserData.age === 'number' && 
       typeof newUserData.name === 'string' && 
       newUserData.age > 0 && 
       newUserData.name.length > 0){
      if(userIndex !== -1) {
        this.data[userIndex] = newUserData
        Message.showColorized(MessageVariant.Success,'User has been successfully editet!');
      } else {
        Message.showColorized(MessageVariant.Error,'User not found...');
      }
    } else {
      Message.showColorized(MessageVariant.Error,'Wrong data!');
    }
  };

  public remove (userName: string) {
    const userIndex: number = this.data.findIndex((user) => user.name === userName);
    if(userIndex !== -1) {
			this.data.splice(userIndex, 1)
      Message.showColorized(MessageVariant.Success,'User deleted!');
    } else {
      Message.showColorized(MessageVariant.Error,'User not found...');
    }
  };
}

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers) => {
    switch (answers.action) {
      case Action.List:
        users.showAll();
        break;
      case Action.Add:
        const user = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }, {
          name: 'age',
          type: 'number',
          message: 'Enter age',
        }]);
        users.add(user);
        break;
      case Action.Edit:
        const userName = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }]);
        if( typeof userName.name === 'string' && userName.name.length > 0){
          const newUserData = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter new name',
          }, {
            name: 'age',
            type: 'number',
            message: 'Enter new age',
          }]);
          users.edit(userName.name, newUserData);
        } else {
          Message.showColorized(MessageVariant.Error,'Wrong data!');
        }
        break;
      case Action.Remove:
        const name = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }]);
        users.remove(name.name);
        break;
      case Action.Quit:
        Message.showColorized(MessageVariant.Info, "Bye bye!");
        return;
      default: Message.showColorized(MessageVariant.Info, "Command not found");
    }

    startApp();
  });
}

const users = new UsersData();

console.log("\n");
console.info("      Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("edit – edit new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");

startApp();