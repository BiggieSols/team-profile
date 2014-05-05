class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.text :body
      t.references :question
      t.string :result_calc

      t.timestamps
    end
    add_index :answers, :question_id
  end
end
