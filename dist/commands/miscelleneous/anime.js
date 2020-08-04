"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const request = require('request');
const ms = require("ms");
class anime {
    constructor() {
        this._command = "anime";
        this.aliases = [];
        this.category = path.basename(__dirname);
        this.display = false;
    }
    help() {
        return "this command does absolutely nothing! Don't go open it for curiosity";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?anime";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            new Date(Date.now()).toLocaleString();
            console.log(Date);
            request('https://api.jikan.moe/v3/schedule/Monday', function (error, response, body) {
                console.log('Status:', response.statusCode);
                console.log('Headers:', JSON.stringify(response.headers));
                console.log('Response:', body);
            });
            msgObject.delete();
            return;
        });
    }
}
exports.default = anime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbWlzY2VsbGVuZW91cy9hbmltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZCQUE2QjtBQUU3QixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpCLE1BQXFCLEtBQUs7SUFBMUI7UUFFb0IsYUFBUSxHQUFHLE9BQU8sQ0FBQztRQUNuQixZQUFPLEdBQWMsRUFBRSxDQUFDO1FBQ3hCLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxLQUFLLENBQUM7SUEyQjlDLENBQUM7SUF6QkcsSUFBSTtRQUNBLE9BQU8sc0VBQXNFLENBQUM7SUFDbEYsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELEtBQUs7UUFDRCxPQUFPLFFBQVEsQ0FBQTtJQUNuQixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQywwQ0FBMEMsRUFBRSxVQUFVLEtBQVUsRUFBRSxRQUE0QyxFQUFFLElBQVM7Z0JBQy9ILE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7WUFFSCxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsT0FBTztRQUNYLENBQUM7S0FBQTtDQUVKO0FBaENELHdCQWdDQyJ9