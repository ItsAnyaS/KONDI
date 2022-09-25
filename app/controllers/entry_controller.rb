require 'jwt'
class EntryController < ApplicationController
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    def index
        render json:Entry.all
    end

    def entries_by_user
        token = params[:user_id]
        if token 
            decoded_token = JWT.decode token, nil, false
            user = User.find_by(username: decoded_token[0]["data"])
            entries = Entry.where(user_id: user["id"])
            if entries
                render json: entries
            end
        else 
            render json: [{message: "Coudn't verify user", params: params}]
        end
    end

    def entries_get_single
        render json:Entry.find_by(id:params[:id])
    end

    def delete_entry
        Entry.find(params[:id]).destroy
        render json:{message:"Deleted Entry #{params[:id]}"}
    end

    def edit_entry
        Entry.find(params[:id]).update(content:params[:content])
        render json:{message:"Updated Entry #{params[:id]}"}
    end

    def new_entry
        #replace user_id with header!!!
        token = params[:user_id]
        decoded_token = JWT.decode token, nil, false
        # render json: { token_id: decoded_token[0]["data"], param_id: params[:id].to_i}
        user = User.find_by(username: decoded_token[0]["data"])
        Entry.create!(user_id:user["id"], title:params[:title], content:params[:content])
        render json:{message:"Created Entry!"}
    end
end