const OUTPUT_STRING = "  ";

var glow = function (text) {
  return "[[g;#EEEEEE;]" + text + "]";
};

var titleText = function (text) {
  return "[[u;inherit;]" + text + "]";
};

function teal(message) {
  return "[[gb;teal;black]" + message + "]";
}
var banner = teal(


  "\t                                                                                 \t\n" +
  "\t                                                                                 \t\n" +
  "\t                                                                                 \t\n" +

  "\t______ _                    _              ______ _                     _      \t\n" +
  "\t| ___ (_)                  | |             |  _  \\ |                   (_)     \t\n" +
  "\t| |_/ /_ _ __ ___ _ __   __| |_ __ __ _    | | | | |__   __ _ _ __ ___  _   \t\n" +
  "\t| ___ \\ | '__/ _ \\ '_ \\ / _` | '__/ _` |   | | | | '_ \\ / _` | '_ ` _ \\| |  \t\n" +
  "\t| |_/ / | | |  __/ | | | (_| | | | (_| |   | |/ /| | | | (_| | | | | | | |  \t\n" +
  "\t\\____/|_|_|  \\___|_| |_|\\__,_|_|  \\__,_|   |___/ |_| |_|\\__,_|_| |_| |_|_|  \t\n" +
  "\t                                                                                 \t\n" +                                                                                                                                            
  "\t                                                                                                                                \u00A9 " +
    getYear() +
  
  "\t                                                                                 \t\n" +
  "\t                                                                                 \t\n" +
  "\t                                                                                 \t\n" 

);

const welcomeMessage = `Welcome to my portfolio! — Type help for a list of supported commands.
`;

var play = false;

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}

function getYear() {
  var today = new Date();
  return today.getFullYear();
}
const messages = {
  repo: `
${OUTPUT_STRING} https://github.com/birendradhami
`,
  help: `
Just type any of the commands below to get some more info. You can even type a few letters and press [tab] to autocomplete.

${OUTPUT_STRING}${glow("about")}
${OUTPUT_STRING}${glow("projects")}
${OUTPUT_STRING}${glow("repo")}
${OUTPUT_STRING}${glow("skills")}
${OUTPUT_STRING}${glow("download_cv")}
${OUTPUT_STRING}${glow("contact")}
${OUTPUT_STRING}${glow("credits")}
${OUTPUT_STRING}${glow("all")}

`,
  about: `
Hey there!
My name is ${glow("Birendra Dhami")}, ${glow(
    "BSc CSIT Student"
  )} at TU From Nepal.
Some of my interests include ${glow(
    "Animation, Sketching, Photography, Sports etc"
  )}.
My contact details can be found by typing 'contact', and if you would like to check out my CV, simply type 'download_CV'.
`,
  projects: `
Just type 'repo' to get the links.
`,
  skills: `
${OUTPUT_STRING}${glow(
    "HTML & CSS HTML, CSS, JS, C++, C#, Python, Php "
  )}     
  ${OUTPUT_STRING}${glow(
    "                     Along with proper knowledge of MySQL, WordPress, dotnet, etc"
  )}                        
`,
  contact: `
${OUTPUT_STRING}${glow("Email")}      - sbirendradhami@gmail.com
${OUTPUT_STRING}${glow("Address")}    - Mahendranagar,Nepal
`,
  credits: `
${OUTPUT_STRING}Site built by ${glow("me")}
${OUTPUT_STRING}Using ${glow("JQuery Terminal Emulator")} 
`
};

var commands = {
  help: function () {
    this.echo(messages.help);
  },

  repo: function () {
    this.echo(messages.repo);
  },

  about: function () {
    this.echo(messages.about);
  },

  projects: function () {
    this.echo(messages.projects);
  },

  skills: function () {
    this.echo(messages.skills);
  },

  contact: function () {
    this.echo(messages.contact);
  },

  credits: function () {
    this.echo(messages.credits);
  },

  download_cv: function () {
    downloadURI(
      "assets/downloads/Birendra Dhami CV.pdf",
      "Birendra Dhami CV.pdf"
    );
  },

  all: function () {
    this.clear();
    this.exec("about");
    this.exec("projects");
    this.exec("skills");
    this.exec("repo");
    this.exec("contact");
    this.exec("credits");
  },
  clear: function () {
    this.clear();

    this.echo(banner);
    this.echo(welcomeMessage);
  }

};

$(function () {
  var isTyping = false;
  function typed(finish_typing) {
    return function (term, message, delay) {
      isTyping = true;
      var prompt = term.get_prompt();
      var c = 0;
      if (message.length > 0) {
        term.set_prompt("");
        var interval = setInterval(function () {
          term.insert(message[c++]);
          if (c == message.length) {
            clearInterval(interval);
            //Next Int
            setTimeout(function () {
              // Swap Cmd
              finish_typing(term, message, prompt);
              isTyping = false;
            }, delay);
          }
        }, delay);
      }
    };
  }

  var typed_message = typed(function (term, message, prompt) {
    term.set_command("");
    term.echo(message);
    term.set_prompt(prompt);
  });

  $("body").terminal(commands, {
    greetings: banner,
    start_from_edge: false,
    prompt: "> ",
    completion: true,
    checkArity: false,
    clear: false,

    onInit: function (term) {
      typed_message(term, welcomeMessage, 0, function () {});
    },

    keydown: function (e) {        
      // ewae
      if (e.which == 90 && e.ctrlKey) {
        play = false;
        return false;
      }

      if (play) {
        return false;
      }

      if (isTyping) {
        return false;
      }
    },

    keypress: function (e, term) {
      console.log("keypress: " + e.which);
    },

    onFocus: function (term) {
      console.log("terminal has gained focus");
    },

    onBlur: function () {
      console.log("terminal has lost focus");
    },
  });
});